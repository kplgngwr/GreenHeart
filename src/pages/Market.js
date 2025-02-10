import React from 'react';
import './Market.css';
import appleImage from './media/apple.jpeg';
import orangeImage from './media/oranges.png';
import spinachImage from './media/spinach.jpg';
import strawberryImage from './media/strawberry.jpg';
import tomatoImage from './media/tomato.jpg';
import featureImage from './media/feature.png';
import { FaSeedling, FaAward, FaTractor, FaPhoneAlt } from 'react-icons/fa'; // Import React icons

function Market() {
  return (
    <div>
      <div className="hero-section">
        <div className="hero-content">
          <h1>E- Market</h1>
          <div className="hero-buttons">
            <a href="/Home" className="btn btn-home">Home</a>
            <button className="btn btn-product">Product</button>
          </div>
        </div>
      </div>

      <div className="product-section">
        <div className="container">
          <div className="container header">
            <h6>E- Market</h6>
            <h1>Explore Our Fresh & Organic Products</h1>
          </div>

          <div className="filter-container">
            <div className="cateogory filter">
              <select className="form-control" id="category-filter">
                <option value="all">All Categories</option>
                <option value="fruits">Fruits</option>
                <option value="vegetables">Vegetables</option>
                <option value="organic">Organic</option>
              </select>
            </div>
            <div className="price filter">
              <select className="form-control" id="sort-options">
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>

          {/* product grid */}
          <div className="product-grid">
            {[
              { img: appleImage, name: "Apples", price: "₹80-150 per kg" },
              { img: orangeImage, name: "Oranges", price: "₹40-80 per kg" },
              { img: spinachImage, name: "Spinach", price: "₹40-80 per kg" },
              { img: strawberryImage, name: "Strawberries", price: "₹200-400 per kg" },
              { img: tomatoImage, name: "Tomatoes", price: "₹20-40 per kg" }

            ].map((product, index) => (
              <div key={index} className="product-column">
                <div className="product-card">
                  <img className="product-image" src={product.img} alt={`Organic ${product.name}`} />
                  <h6 className="product-name">{product.name}</h6>
                  <h5 className="product-price">{product.price}</h5>
                  <div className="shopping-btn">
                    <button className="add-to-cart-btn"><i className="bi bi-cart text-white"></i> Add to Cart</button>
                    <button className="view-details-btn"><i className="bi bi-eye text-white"></i> View Details</button>
                  </div>
                </div>

              </div>
            ))}
          </div>

          <div className="pagination-row">
            <div className="pagination">
              <button className="page-link-previous"> ← </button>
              <button className="page-link">1</button>
              <button className="page-link">2</button>
              <button className="page-link">3</button>
              <button className="page-link-next"> → </button>

            </div>
          </div>
        </div>
      </div>

      {/* Features Start */}
      <div className="feature-section-main">
        <div className="feature-heading" >
          <h6>Features</h6>
          <h1>Why Choose Us!!!</h1>

          <div className="feature-container">
            <div className="feature-row">
              <div className="feature-column-1">
                <div className="feature-1">
                  <FaSeedling className="React-icon" />
                  <h4>100% Organic</h4>
                  <p className="feature-content">Grown without harmful chemicals, pesticides, or fertilizers. Experience the true taste of nature.</p>
                </div>
                <div className="feature-2">
                  <FaAward className="React-icon" /> {/* Use React icon */}
                  <h4>100% Authentic</h4>
                  <p className="feature-content">Directly from the farm to your table. Guaranteed quality and origin.</p>
                </div>
              </div>

              <div className="feature-column-2">
                <div className="feature-5">
                  <div className="feature-content">
                    <p>Connect with a thriving community of organic farmers and customers. Our platform empowers farmers to sell directly, access cutting-edge technology, and increase their income, while providing customers with access to fresh, certified organic produce, supporting local food systems, and fostering a more sustainable future for agriculture.</p>
                    <img className="featureImage" src={featureImage} alt="" />
                  </div>
                </div>
              </div>

              <div className="feature-column-3">
                <div className="feature-3">
                  <FaTractor className="React-icon" /> {/* Use React icon */}
                  <h4>Modern Farming</h4>
                  <p className="feature-content">Connecting farmers with advanced technology for increased efficiency, reduced waste, and improved yields.</p>
                </div>
                <div className="feature-4">
                  <FaPhoneAlt className="React-icon" /> {/* Use React icon */}
                  <h4>24/7 Support</h4>
                  <p className="feature-content">Our team is available around the clock to assist you with any questions or concerns.</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Market;