{/* 1. Precision Farming Card */ }
<div className="h-40 overflow-hidden bg-gradient-to-r from-green-600 to-green-400"></div>
function ServiceOverview() {
  return (
    <>
      {/* Hero Section */}
      <section
        className="relative h-[500px] bg-cover bg-center bg-[url('https://media.istockphoto.com/id/1139667548/photo/green-fields-of-onions-and-other-vegetables-in-eilat-israel.jpg?s=612x612&w=0&k=20&c=YSu6YoSO4JU21MKDj_CRGz20i3VVtPLc4F4OOzprKnA=')]"
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-5xl font-bold mb-4">Discover Our Services</h1>
            <p className="text-xl mb-8">
              Empowering Agriculture Through Innovation
            </p>
            <a
              href="#services"
              className="bg-green-600 hover:bg-green-700 text-white py-3 px-8 rounded-full font-semibold transition duration-300"
            >
              Explore Now
            </a>
          </div>
        </div>
      </section>

      {/* Main Service Overview */}
      <section id="services" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          {/* Introduction */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-center mb-6 bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
              GreenHeart – Services Overview
            </h1>
            <p className="max-w-3xl mx-auto text-center text-gray-700">
              GreenHeart provides a comprehensive suite of AI-powered
              agricultural services to support farmers, optimize farm operations,
              and enhance productivity. These services are categorized into two
              main sections: <strong>For Farmers</strong> and <strong>For Assigned Teams/Admins</strong>.
            </p>
          </div>

          {/* Farmer Services Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-10 relative">
              <span className="bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">Services for Farmers</span>
              <div className="absolute w-24 h-1 bg-gradient-to-r from-green-600 to-green-400 bottom5 left-1/2 transform -translate-x-1/2 mt-2"></div>
            </h2>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* 1. Precision Farming Card */}
              <div className="group rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-white hover:scale-105 border border-gray-100">
                <div className="h-40 overflow-hidden bg-gradient-to-r from-green-600 to-green-400">
                  <img src="/precision-farming.jpg" alt="Precision Farming" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-green-700">Precision Farming & AI-Powered Insights</h3>
                  <ul className="space-y-2 mb-4 text-gray-600">
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <span><strong>AI-Based Crop Selection</strong>: Personalized recommendations based on soil and climate</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <span><strong>Yield Prediction & Risk Assessment</strong>: AI models for risk forecasting</span>
                    </li>
                  </ul>
                  <a href="/services/precision-farming" className="inline-block px-4 py-2 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-full text-sm font-medium hover:from-green-700 hover:to-green-600 transition-all duration-300">
                    Learn More
                  </a>
                </div>
              </div>

              {/* 2. GIS Services Card */}
              <div className="group rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-white hover:scale-105 border border-gray-100">
                <div className="h-40 overflow-hidden bg-gradient-to-r from-green-500 to-emerald-400">
                  <img src="/smart-soil.jpg" alt="Smart Soil Management" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-emerald-700">GIS Mapping & Analysis</h3>
                  <ul className="space-y-2 mb-4 text-gray-600">
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <span><strong>Spatial Data Collection</strong>: Advanced mapping techniques for precise data</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <span><strong>Geospatial Analysis</strong>: In-depth analysis for better decision making</span>
                    </li>
                  </ul>
                  <a href="/gis" className="inline-block px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-400 text-white rounded-full text-sm font-medium hover:from-green-600 hover:to-emerald-500 transition-all duration-300">
                    Learn More
                  </a>
                </div>
              </div>

              {/* 3. Drone Services Card */}
              <div className="group rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-white hover:scale-105 border border-gray-100">
                <div className="h-40 overflow-hidden bg-gradient-to-r from-emerald-500 to-teal-400">
                  <img src="/drone-services.jpg" alt="Drone Services" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-green-700">Automated Farm Monitoring & Drones</h3>
                  <ul className="space-y-2 mb-4 text-gray-600">
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <span><strong>Drone-Based Surveillance</strong>: AI drones for crop monitoring</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <span><strong>Automated Crop Spraying</strong>: Precision pesticide distribution</span>
                    </li>
                  </ul>
                  <a href="/services/drone-monitoring" className="inline-block px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-400 text-white rounded-full text-sm font-medium hover:from-emerald-600 hover:to-teal-500 transition-all duration-300">
                    Learn More
                  </a>
                </div>
              </div>

              {/* 4. Farm Lease Card */}
              <div className="group rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-white hover:scale-105 border border-gray-100">
                <div className="h-40 overflow-hidden bg-gradient-to-r from-teal-500 to-cyan-400">
                  <img src="/farm-lease.jpg" alt="Farm Lease" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-green-700">Farm Lease & Financial Assistance</h3>
                  <ul className="space-y-2 mb-4 text-gray-600">
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <span><strong>Land Leasing & Management</strong>: Tech-equipped farm leasing</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <span><strong>Agri-Fintech Solutions</strong>: Insurance and financial advisory</span>
                    </li>
                  </ul>
                  <a href="/services/farm-finance" className="inline-block px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-400 text-white rounded-full text-sm font-medium hover:from-teal-600 hover:to-cyan-500 transition-all duration-300">
                    Learn More
                  </a>
                </div>
              </div>

              {/* 5. Market Integration Card */}
              <div className="group rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-white hover:scale-105 border border-gray-100">
                <div className="h-40 overflow-hidden bg-gradient-to-r from-cyan-500 to-green-400">
                  <img src="/marketplace.jpg" alt="Marketplace" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-green-700">Farm-to-Market & Marketplace</h3>
                  <ul className="space-y-2 mb-4 text-gray-600">
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <span><strong>Direct Selling Platform</strong>: GreenHeart Agri-Marketplace</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <span><strong>Real-Time Price Tracking</strong>: Fair market rates</span>
                    </li>
                  </ul>
                  <a href="/market" className="inline-block px-4 py-2 bg-gradient-to-r from-cyan-500 to-green-400 text-white rounded-full text-sm font-medium hover:from-cyan-600 hover:to-green-500 transition-all duration-300">
                    Visit Marketplace
                  </a>
                </div>
              </div>

              {/* 6. Expert Support Card */}
              <div className="group rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-white hover:scale-105 border border-gray-100">
                <div className="h-40 overflow-hidden bg-gradient-to-r from-green-500 to-green-400">
                  <img src="/training.jpg" alt="Expert Support" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-green-700">Expert Support & Training</h3>
                  <ul className="space-y-2 mb-4 text-gray-600">
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <span><strong>24/7 Farming Assistance</strong>: Expert agriculture guidance</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <span><strong>Training & Workshops</strong>: Digital literacy in farming</span>
                    </li>
                  </ul>
                  <a href="/training" className="inline-block px-4 py-2 bg-gradient-to-r from-green-500 to-green-400 text-white rounded-full text-sm font-medium hover:from-green-600 hover:to-green-500 transition-all duration-300">
                    Join Workshops
                  </a>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-12 text-center">
              <a href="/contact" className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-green-400 text-white font-medium rounded-full hover:from-green-700 hover:to-green-500 transition-all duration-300 shadow-lg hover:shadow-xl">
                <span>Request Farm Services</span>
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </a>
            </div>
          </div>

          {/* Admin Services Summary */}
          <div className="mt-16 p-6 bg-gradient-to-r from-green-100 to-emerald-50 rounded-xl shadow-sm">
            <h2 className="text-2xl font-bold mb-4 text-green-700">For Assigned Teams &amp; Admins</h2>
            <p className="text-gray-700 mb-4">
              Our comprehensive admin tools include AI-based farm management systems, resource allocation tools,
              data analytics platforms, and smart logistics management. These services empower our teams to deliver
              exceptional support to farmers.
            </p>
            <a href="/admin-services" className="text-green-600 hover:text-green-800 font-medium inline-flex items-center">
              Learn more about admin services
              <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </a>
          </div>

          {/* Why These Services Matter */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-4">Why These Services Matter?</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>
                <span className="font-semibold">For Farmers:</span> Empowers them with
                cutting-edge technology, financial stability, and direct market access.
              </li>
              <li>
                <span className="font-semibold">For Admin &amp; Teams:</span> Ensures efficient
                farm management, predictive analytics, and expert support allocation.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

export default ServiceOverview;
