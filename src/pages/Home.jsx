import React from 'react';
import { Cpu, Monitor, BarChart, ShoppingCart, Leaf, MapPin, Quote, TrendingUp, Truck, ArrowRight, ArrowDown, Users, Briefcase, ShoppingBag } from 'lucide-react';

const features = [
  {
    title: "AI-Powered Farming",
    description: "AI-based crop recommendations, growth predictions, and pest detection.",
    icon: <Cpu className="w-10 h-10 text-green-500" />,
    link: "#"
  },
  {
    title: "IoT-Enabled Farm Management",
    description: "Real-time monitoring of soil health, irrigation systems, and weather conditions.",
    icon: <Monitor className="w-10 h-10 text-green-500" />,
    link: "#"
  },
  {
    title: "Data-Driven Decision Making",
    description: "Farmers receive actionable insights based on detailed analytics and market demand predictions.",
    icon: <BarChart className="w-10 h-10 text-green-500" />,
    link: "#"
  },
  {
    title: "Farm-to-Market Marketplace",
    description: "Direct access for consumers and businesses to purchase fresh produce directly from farmers.",
    icon: <ShoppingCart className="w-10 h-10 text-green-500" />,
    link: "#"
  },
  {
    title: "Sustainable Practices",
    description: "Use of minimal resources, reduction of waste, and emphasis on organic and eco-friendly farming.",
    icon: <Leaf className="w-10 h-10 text-green-500" />,
    link: "#"
  },
];

const steps = [
  {
    title: "Land Leasing & Team Assignment",
    description: "GreenHeart leases land to farmers and assigns specialized teams.",
    icon: <MapPin className="w-8 h-8 text-green-500" />
  },
  {
    title: "Data Collection & Analysis",
    description: "IoT sensors and drones monitor farm conditions, sending data to AI-powered systems.",
    icon: <Cpu className="w-8 h-8 text-green-500" />
  },
  {
    title: "Farm Management & Crop Recommendations",
    description: "Farmers receive real-time insights and crop guidance.",
    icon: <BarChart className="w-8 h-8 text-green-500" />
  },
  {
    title: "Market Demand & Harvesting",
    description: "Production is aligned with market demand to minimize waste.",
    icon: <TrendingUp className="w-8 h-8 text-green-500" />
  },
  {
    title: "Farm-to-Market Delivery",
    description: "Produce is delivered to buyers through the GreenHeart marketplace.",
    icon: <Truck className="w-8 h-8 text-green-500" />
  },
];

const benefits = [
  {
    category: "For Farmers",
    icon: <Users className="w-10 h-10 text-green-500" />,
    points: [
      "Increased yields through data-driven farming techniques.",
      "Access to expert advice and educational resources.",
      "Secure and transparent lease management.",
    ]
  },
  {
    category: "For Businesses",
    icon: <Briefcase className="w-10 h-10 text-green-500" />,
    points: [
      "Consistent supply of quality produce.",
      "Transparent farming practices with traceability of all products.",
      "Convenient, direct-to-supplier marketplace.",
    ]
  },
  {
    category: "For Consumers",
    icon: <ShoppingBag className="w-10 h-10 text-green-500" />,
    points: [
      "Fresh, high-quality produce directly from farms.",
      "Full transparency on the farming processes and product quality.",
      "Access to seasonal crops and personalized recommendations.",
    ]
  }
];

const testimonials = [
  {
    text: "GreenHeart’s AI-driven recommendations turned our farm around, increasing our crop yield by 30% in just one season.",
  },
  {
    text: "The farm-to-market marketplace helped us reach new customers directly, cutting out the middleman.",
  },
  {
    text: "As a farmer, the real-time insights GreenHeart provided allowed us to make better decisions and maximize our returns.",
  },
];

function Home() {
  return (
    <div className="w-full overflow-x-hidden">
      <div className="video-container relative h-[70vh] w-full overflow-hidden">
        <video autoPlay loop muted playsInline className="background-video absolute top-1/2 left-1/2 w-full h-full object-cover transform -translate-x-1/2 -translate-y-1/2">
          <source src="/bcg3.mp4" type="video/mp4" />
        </video>
        <div className="overlay absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex flex-col items-center justify-center text-white text-center p-5">
          <h1 className="font-bold">Connect with a global network of consumers who value sustainable farming practices.</h1>
          <h2 className=" text-green-500 font-semibold">Empowering <span className="text-white">Farmers</span> , Enriching Communities</h2>
        </div>
      </div>

      <div className="text-center py-10 px-5 bg-gray-100">
        <h1 className="text-4xl font-bold text-gray-900">Connect Farmers and Buyers. Grow Your Business Together</h1>
        <p className="text-lg text-green-700 mt-3">Green Heart Marketplace is a digital B2B platform that simplifies agricultural transactions, ensuring fair prices and efficient delivery.</p>
      </div>

      <section className="py-16 bg-gray-50">
        <div className="container  px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Key Features
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow p-6 flex flex-col items-center text-center hover:shadow-lg transition duration-300 w-full max-w-sm"
              >
                <div className="mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {feature.description}
                </p>
                <a
                  href={feature.link}
                  className="mt-auto text-green-600 font-medium hover:underline"
                >
                  Learn More &rarr;
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            How It Works
          </h2>
          <div className="relative">
            {/* Horizontal line connecting the steps */}
            <div className="relative flex flex-col md:flex-row justify-between items-center">
              {steps.map((step, index) => (
                <React.Fragment key={index}>
                  <div className="flex flex-col items-center text-center md:w-1/5 relative z-10 mb-8 md:mb-0">
                    <div className="bg-white border-2 border-green-500 rounded-full w-16 h-16 flex items-center justify-center mb-4 shadow-lg hover:shadow-xl transition">
                      {step.icon}
                    </div>
                    <h3 className="text-lg font-semibold mb-2 px-2">{step.title}</h3>
                    <p className="text-gray-600 text-sm px-2">{step.description}</p>
                  </div>
                  {index !== steps.length - 1 && (
                    <div className="flex items-center justify-center my-4 md:my-0">
                      {/* Show down arrow on mobile and right arrow on desktop */}
                      <ArrowDown className="w-6 h-6 text-green-500 block md:hidden" />
                      <ArrowRight className="w-6 h-6 text-green-500 hidden md:block" />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Benefits of GreenHeart
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center transition transform hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4">{item.category}</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  {item.points.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Testimonials
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center transition transform hover:-translate-y-2 hover:shadow-2xl"
              >
                <Quote className="w-8 h-8 text-green-500 mb-4" />
                <p className="text-gray-600 italic">
                  "{testimonial.text}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 ">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Revolutionize Your Farm?
          </h2>
          <p className="text-lg mb-8">
            Join GreenHeart and start revolutionizing your farm today. Experience our innovative platform firsthand and transform your agricultural practices.
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8">
            <a
              href="/demo"
              className="px-6 py-3 border-2 bg-white text-green-600 rounded-lg font-semibold hover:bg-gray-100 transition duration-300"
            >
              Request a Demo
            </a>
            <a
              href="/join"
              className="px-6 py-3 bg-green-700 text-white rounded-lg font-semibold hover:bg-green-800 transition duration-300"
            >
              Join GreenHeart and Start Revolutionizing Your Farm Today
            </a>
          </div>
          <p className="text-sm">
            For businesses, investors, or potential collaborators, please{' '}
            <a
              href="/contact"
              className="underline font-medium hover:text-gray-200"
            >
              contact us
            </a>.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Home;