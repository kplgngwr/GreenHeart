import React from 'react';

function Resource() {
  return (
    <div>
      {/* 1. Hero Section */}
      <section
        className="relative h-[500px] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: 'url(https://img.freepik.com/free-photo/refreshment-from-as-sprinklers-arc-water-geometric-greenery-fields_91128-4431.jpg?t=st=1742451592~exp=1742455192~hmac=a32072d7a2a4f7cb04775d7b5bbd57f0363c9bbf6297b7972524a1aab5c50352&w=2000)' }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl font-bold mb-4">
            Revolutionizing Agriculture with Water Farming
          </h1>
          <p className="text-xl">
            Harnessing water bodies for sustainable superfood cultivation using AI-driven submarine and floater technology.
          </p>
        </div>
      </section>

      {/* 2. Introduction to Water Farming */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Introduction to Water Farming</h2>
          <p className="text-lg text-gray-700 mb-8">
            Water farming is an innovative approach that uses water bodies as cultivation sites,
            reducing land dependency while opening new frontiers for sustainable, high-yield agriculture.
            By integrating advanced AI and IoT technologies, water farming is transforming traditional farming practices.
          </p>
          {/* Infographic/Animation */}
          <div className="flex justify-center">
            <img
              src="./water.jpeg"
              alt="Infographic: Land vs. Water Farming"
              className="max-w-full rounded-lg shadow-md"
            />
          </div>
        </div>
      </section>

      {/* 3. Our Technology */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Our Technology</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Submarine Sensor System */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-3">Submarine Sensor System</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Detects water quality, nutrient levels, and environmental conditions.</li>
                <li>Uses IoT and AI for real-time monitoring.</li>
              </ul>
            </div>
            {/* Floating Farming Units */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-3">Floating Farming Units</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Designed for superfood cultivation on water surfaces.</li>
                <li>Integrated with automated harvesting and nutrient control.</li>
              </ul>
            </div>
            {/* Live Data & Analytics */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-3">Live Data & Analytics</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>AI-driven insights on optimal harvesting periods.</li>
                <li>Satellite integration for large-scale monitoring.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Testing & Research Videos */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-6">Testing & Research Videos</h2>
          {/* Embedded Video */}
          <div className="mb-8 flex justify-center ">
            <video
              className="h-96 rounded-lg shadow-md"
              src="./Testing.mp4"
              autoPlay
              loop
              muted
              playsInline
            ></video>
          </div>
          {/* Image Gallery */}
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-center">Research & Testing Gallery</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <img
                src="./Reading_1.jpeg"
                alt="Research Image 1"
                className="w-full h-96 object-cover rounded-lg shadow-md"
              />
              <img
                src="./Reading_3.jpeg"
                alt="Research Image 3"
                className="w-full h-96 object-cover rounded-lg shadow-md"
              />
              <img
                src="./Reading_2.jpeg"
                alt="Research Image 2"
                className="w-full h-96 object-cover rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 5. Benefits & Impact */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Benefits & Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-2xl font-semibold mb-3">Sustainability</h3>
              <p className="text-gray-700">Reduces land dependency and maximizes water resource use.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-2xl font-semibold mb-3">Higher Yield</h3>
              <p className="text-gray-700">Superfoods like algae, seaweed, and aquatic crops thrive in controlled water farming.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-2xl font-semibold mb-3">Climate Resilience</h3>
              <p className="text-gray-700">Adapts to fluctuating environmental conditions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Featured Superfoods */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Featured Superfoods</h2>
          <p className="text-lg text-gray-700 mb-8">
            Discover the nutrient-rich superfoods cultivated through our innovative water farming methods.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <img
                src="./spirulina_21204.jpg"
                alt="Spirulina"
                className="w-full h-64 object-cover rounded-lg shadow-md"
              />
              <h3 className="text-2xl font-semibold mt-4">Spirulina</h3>
            </div>
            <div>
              <img
                src="/Moringa.jpeg"
                alt="Moringa"
                className="w-full h-64 object-cover rounded-lg shadow-md"
              />
              <h3 className="text-2xl font-semibold mt-4">Moringa</h3>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Future Scope & Implementation Plans */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Future Scope & Implementation Plans</h2>
          <ul className="list-disc list-inside text-lg text-gray-700 max-w-3xl mx-auto space-y-4">
            <li>Expansion to large-scale water farming projects.</li>
            <li>Integration with satellite and IoT-driven predictive models.</li>
            <li>Collaboration with farmers and research institutes.</li>
          </ul>
        </div>
      </section>

      {/* 8. Call to Action (CTA) */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-green-700 text-white text-center">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-6">Join the Water Farming Revolution</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="/research"
              className="px-6 py-3 bg-white text-green-600 rounded-lg font-semibold hover:bg-gray-100 transition duration-300"
            >
              Learn More
            </a>
            <a
              href="/partner"
              className="px-6 py-3 bg-transparent border border-white text-white rounded-lg font-semibold hover:bg-white hover:text-green-600 transition duration-300"
            >
              Partner with Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Resource;
