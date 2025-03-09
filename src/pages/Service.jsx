import React from 'react';

function ServiceOverview() {
  return (
    <>
      {/* Hero Section */}
      <section
        className="relative h-[500px] bg-cover bg-center bg-[url(/vision.png)]"
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
            <h1 className="text-4xl font-bold text-center mb-6">
              GreenHeart – Services Overview
            </h1>
            <p className="max-w-3xl mx-auto text-center text-gray-700">
              GreenHeart provides a comprehensive suite of AI-powered
              agricultural services to support farmers, optimize farm operations,
              and enhance productivity. These services are categorized into two
              main sections: <strong>For Farmers</strong> – services that help
              individual farmers improve their crop yield and manage farm
              operations, and <strong>For Assigned Teams/Admins</strong> – services
              for internal teams to efficiently manage projects, analyze data, and
              provide expert assistance.
            </p>
          </div>

          {/* Two-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Services for Farmers */}
            <div>
              <h2 className="text-2xl font-bold text-green-600 mb-6">
                Services for Farmers
              </h2>
              <div className="space-y-6">
                {/* 1.1 Precision Farming & AI-Powered Insights */}
                <div className="p-6 bg-white rounded-lg shadow hover:shadow-xl transition duration-300">
                  <h3 className="text-xl font-semibold mb-2">
                    Precision Farming &amp; AI-Powered Insights
                  </h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>
                      <strong>AI-Based Crop Selection:</strong> Personalized
                      recommendations on which crops to grow based on soil health,
                      climate conditions, and market demand.
                    </li>
                    <li>
                      <strong>Yield Prediction &amp; Risk Assessment:</strong>{" "}
                      Advanced AI models predict expected yield and potential risks
                      due to climate change, pests, or soil degradation.
                    </li>
                  </ul>
                </div>

                {/* 1.2 Smart Soil & Water Management */}
                <div className="p-6 bg-white rounded-lg shadow hover:shadow-xl transition duration-300">
                  <h3 className="text-xl font-semibold mb-2">
                    Smart Soil &amp; Water Management
                  </h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>
                      <strong>Soil Testing &amp; Nutrient Analysis:</strong> Mobile
                      lab vans conduct on-site soil testing to determine nutrient
                      levels and deficiencies.
                    </li>
                    <li>
                      <strong>Precision Irrigation &amp; IoT-Based Water Management:</strong>{" "}
                      Smart sensors optimize water usage, reducing waste and
                      improving efficiency.
                    </li>
                  </ul>
                </div>

                {/* 1.3 Automated Farm Monitoring & Drone Services */}
                <div className="p-6 bg-white rounded-lg shadow hover:shadow-xl transition duration-300">
                  <h3 className="text-xl font-semibold mb-2">
                    Automated Farm Monitoring &amp; Drone Services
                  </h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>
                      <strong>Drone-Based Crop Surveillance:</strong> AI-driven
                      drones detect diseases, track growth, and identify pest
                      infestations.
                    </li>
                    <li>
                      <strong>Automated Crop Spraying:</strong> Drone technology
                      ensures efficient pesticide and fertilizer distribution with
                      minimal waste.
                    </li>
                  </ul>
                </div>

                {/* 1.4 Farm Lease & Financial Assistance */}
                <div className="p-6 bg-white rounded-lg shadow hover:shadow-xl transition duration-300">
                  <h3 className="text-xl font-semibold mb-2">
                    Farm Lease &amp; Financial Assistance
                  </h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>
                      <strong>Land Leasing &amp; Management:</strong> Farmers can
                      lease GreenHeart-managed farms equipped with AI-driven
                      agricultural technology.
                    </li>
                    <li>
                      <strong>Agri-Fintech Solutions:</strong> Crop insurance,
                      financial advisory, and access to government subsidies and
                      agricultural loans.
                    </li>
                  </ul>
                </div>

                {/* 1.5 Farm-to-Market Logistics & Marketplace Integration */}
                <div className="p-6 bg-white rounded-lg shadow hover:shadow-xl transition duration-300">
                  <h3 className="text-xl font-semibold mb-2">
                    Farm-to-Market Logistics &amp; Marketplace Integration
                  </h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>
                      <strong>Direct Selling Platform:</strong> Sell crops directly
                      to businesses and consumers through the GreenHeart Agri-
                      Marketplace.
                    </li>
                    <li>
                      <strong>Real-Time Price Tracking:</strong> AI-driven price analysis
                      ensures fair market rates for farmers.
                    </li>
                    <li>
                      <strong>GreenHeart Logistics Support:</strong> Fast and secure
                      transportation of produce from farm to market.
                    </li>
                  </ul>
                </div>

                {/* 1.6 Expert Support & Training */}
                <div className="p-6 bg-white rounded-lg shadow hover:shadow-xl transition duration-300">
                  <h3 className="text-xl font-semibold mb-2">
                    Expert Support &amp; Training
                  </h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>
                      <strong>24/7 Farming Assistance:</strong> Connect with agriculture
                      specialists for expert guidance.
                    </li>
                    <li>
                      <strong>Training &amp; Workshops:</strong> Digital literacy programs
                      on modern farming techniques, government policies, and financial
                      management.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Services for Assigned Teams & Admins */}
            <div>
              <h2 className="text-2xl font-bold text-green-600 mb-6">
                Services for Assigned Teams &amp; Admins
              </h2>
              <div className="space-y-6">
                {/* 2.1 AI-Based Farm Management System */}
                <div className="p-6 bg-white rounded-lg shadow hover:shadow-xl transition duration-300">
                  <h3 className="text-xl font-semibold mb-2">
                    AI-Based Farm Management System
                  </h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>
                      <strong>Real-Time Farm Monitoring Dashboard:</strong> Displays farm
                      boundaries, soil data, weather conditions, crop health, and
                      financial insights.
                    </li>
                    <li>
                      <strong>Automated Risk Alerts:</strong> AI-driven pest, disease, and
                      climate alerts enable proactive interventions.
                    </li>
                  </ul>
                </div>

                {/* 2.2 Resource Allocation & Expert Assignments */}
                <div className="p-6 bg-white rounded-lg shadow hover:shadow-xl transition duration-300">
                  <h3 className="text-xl font-semibold mb-2">
                    Resource Allocation &amp; Expert Assignments
                  </h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>
                      <strong>Team Assignment System:</strong> Admins can assign agricultural
                      specialists based on expertise and requirements.
                    </li>
                    <li>
                      <strong>Service Request Management:</strong> Farmers’ service requests
                      are tracked, assigned, and completed efficiently.
                    </li>
                  </ul>
                </div>

                {/* 2.3 Data Analytics & Decision Support */}
                <div className="p-6 bg-white rounded-lg shadow hover:shadow-xl transition duration-300">
                  <h3 className="text-xl font-semibold mb-2">
                    Data Analytics &amp; Decision Support
                  </h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>
                      <strong>Predictive Analytics for Yield Optimization:</strong> AI-driven
                      insights help maximize crop yield with minimal resource wastage.
                    </li>
                    <li>
                      <strong>Supply Chain &amp; Market Trends Analysis:</strong> Data intelligence
                      predicts market trends, crop demands, and pricing strategies.
                    </li>
                  </ul>
                </div>

                {/* 2.4 Smart Logistics & Distribution */}
                <div className="p-6 bg-white rounded-lg shadow hover:shadow-xl transition duration-300">
                  <h3 className="text-xl font-semibold mb-2">
                    Smart Logistics &amp; Distribution
                  </h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>
                      <strong>Automated Transportation Scheduling:</strong> Ensures efficient
                      farm-to-market logistics.
                    </li>
                    <li>
                      <strong>Quality Assurance &amp; Compliance Monitoring:</strong> Guarantees
                      produce meets industry standards before market delivery.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
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
