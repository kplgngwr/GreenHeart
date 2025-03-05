import React from 'react';
import grainImage from '/r1.png';
import nutsImage from '/r2.png';
import greenCoffeeImage from '/r3.png';
import oliveImage from '/r4.png';
import heroImage from '/heroimg1.jpg';
import thumbnailImage from '/Thumbnail.png';
import workflowImage from '/workflow.png';
import workingImage from '/WORKING.jpg';
import servicesImage from '/2..png';
import feature1Image from '/1.png';
import feature2Image from '/2.png';
import feature3Image from '/3.png';
import feature4Image from '/4.png';

function Home() {
  return (
    <div className="w-full overflow-x-hidden">
      <div className="video-container relative h-[70vh] w-full overflow-hidden">
        <video autoPlay loop muted playsInline className="background-video absolute top-1/2 left-1/2 w-full h-full object-cover transform -translate-x-1/2 -translate-y-1/2">
          <source src="/bcg3.mp4" type="video/mp4" />
        </video>
        <div className="overlay absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex flex-col items-center justify-center text-white text-center p-5">
          <h1 className="text-3xl font-bold">Connect with a global network of consumers who value sustainable farming practices.</h1>
          <h2 className="text-xl text-green-500 font-semibold">Empowering Farmers, Enriching Communities</h2>
        </div>
      </div>
      
      <div className="text-center py-10 px-5 bg-gray-100">
        <h1 className="text-4xl font-bold text-gray-900">Connect Farmers and Buyers. Grow Your Business Together</h1>
        <p className="text-lg text-green-700 mt-3">Green Heart Marketplace is a digital B2B platform that simplifies agricultural transactions, ensuring fair prices and efficient delivery.</p>
      </div>

      <div className="flex flex-wrap justify-center gap-10 p-10">
        <div className="w-1/3 shadow-lg rounded-lg overflow-hidden bg-white p-5">
          <img src={heroImage} alt="Agriculture" className="w-full h-auto rounded-lg" />
        </div>
        <div className="w-1/3 flex flex-col items-center">
          <p className="text-gray-700 text-lg text-center">Our Vision: To create a thriving agricultural ecosystem where farmers are empowered, consumers have access to fresh, quality produce, and the planet is protected.</p>
          <button className="mt-5 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">Join Us</button>
          <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Learn More</button>
        </div>
      </div>

      <div className="bg-white py-10">
        <h2 className="text-3xl font-bold text-center text-green-700">Key Features</h2>
        <div className="flex flex-wrap justify-center gap-10 mt-10">
          {[feature1Image, feature2Image, feature3Image, feature4Image].map((feature, index) => (
            <div key={index} className="w-56 p-5 bg-gray-100 rounded-lg shadow-lg text-center">
              <img src={feature} alt="Feature" className="w-24 h-24 mx-auto" />
              <h3 className="text-xl font-semibold mt-3">Feature {index + 1}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;