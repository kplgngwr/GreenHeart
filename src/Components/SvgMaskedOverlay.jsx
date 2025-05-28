// SvgMaskedOverlay.jsx
import React, { useEffect, useRef } from "react";

const SvgMaskedOverlay = ({ map, path, imageUrl, id }) => {
  const overlayRef = useRef(null);

  useEffect(() => {
    if (!map) return;

    class CustomOverlay extends window.google.maps.OverlayView {
      constructor() {
        super();
        this.div = null;
        this.svgEl = null;
      }

      onAdd() {
        this.div = document.createElement("div");
        this.div.style.position = "absolute";
        
        // Create SVG element
        this.svgEl = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this.svgEl.setAttribute("style", "position: absolute; overflow: visible;");
        this.div.appendChild(this.svgEl);
        
        const panes = this.getPanes();
        panes.overlayLayer.appendChild(this.div);
      }

      draw() {
        if (!this.svgEl) return;
        
        const proj = this.getProjection();
        
        // Create bounds from the polygon
        const bounds = new window.google.maps.LatLngBounds();
        path.forEach(point => bounds.extend(new window.google.maps.LatLng(point.lat, point.lng)));
        
        // Get the SW and NE corners in pixel coordinates
        const sw = proj.fromLatLngToDivPixel(bounds.getSouthWest());
        const ne = proj.fromLatLngToDivPixel(bounds.getNorthEast());
        
        // Calculate width and height
        const w = ne.x - sw.x;
        const h = sw.y - ne.y;
        
        // Position the div container
        this.div.style.left = sw.x + "px";
        this.div.style.top = ne.y + "px";
        this.div.style.width = w + "px";
        this.div.style.height = h + "px";
        
        // Set SVG to fill the div
        this.svgEl.setAttribute("width", "100%");
        this.svgEl.setAttribute("height", "100%");
        this.svgEl.setAttribute("viewBox", `0 0 ${w} ${h}`);
        
        // Convert polygon points to pixel coordinates relative to the SW corner
        const pix = path.map(({ lat, lng }) => {
          const pixel = proj.fromLatLngToDivPixel(new window.google.maps.LatLng(lat, lng));
          return { x: pixel.x - sw.x, y: pixel.y - ne.y };
        });
        
        // Build clipPath
        const clipId = `clip-${id}`;
        const points = pix.map(p => `${p.x},${p.y}`).join(" ");
        
        this.svgEl.innerHTML = `
        <defs>
          <clipPath id="${clipId}">
            <polygon points="${points}" />
          </clipPath>
        </defs>
        <image
          href="${imageUrl}"
          x="0"
          y="0"
          width="${w}"
          height="${h}"
          preserveAspectRatio="none"
          clip-path="url(#${clipId})"
        />
        `;
      }

      onRemove() {
        if (this.div && this.div.parentNode) {
          this.div.parentNode.removeChild(this.div);
          this.div = null;
          this.svgEl = null;
        }
      }
    }

    // Create and set the overlay
    const overlay = new CustomOverlay();
    overlay.setMap(map);
    overlayRef.current = overlay;

    // Clean up on unmount
    return () => {
      if (overlayRef.current) {
        overlayRef.current.setMap(null);
      }
    };
  }, [map, path, imageUrl, id]);

  return null;
};

export default SvgMaskedOverlay;