import React from 'react';
import { FaShoppingBasket, FaChalkboardTeacher, FaVrCardboard, FaSeedling, FaMicroscope } from 'react-icons/fa';

const Services = () => {
    return (
        <div className="w-full">
            {/* Hero Section */}
            <div className="bg-cover bg-center h-52 flex items-center pl-10 text-white" style={{ backgroundImage: "url('/carousel-1.png')" }}>
                <div>
                    <h1 className="text-4xl font-bold">Our Services</h1>
                    <div className="flex gap-4 mt-3">
                        <a href="/home" className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">Home</a>
                        <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">Services</button>
                    </div>
                </div>
            </div>

            {/* Services Section */}
            <div className="py-10 px-5 text-center">
                <h6 className="text-green-600 uppercase text-xl font-bold tracking-wide">Services</h6>
                <h1 className="text-4xl font-bold text-gray-900">Organic Farm Services</h1>
                <p className="text-gray-600 mt-3">Empower organic farmers with modern technology, connect them to a thriving marketplace, and foster sustainable practices.</p>
                <a href="/aboutus" className="mt-4 transition-transform transform hover:scale-105 inline-block px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">Contact Us</a>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-10 mb-4">
                {[
                    { icon: FaShoppingBasket, title: "Fresh and Organic Produce", description: "Discover fresh, locally sourced organic produce.", link: "/market" },
                    { icon: FaChalkboardTeacher, title: "Educational Content", description: "Access expert knowledge on organic farming.", link: "/detail" },
                    { icon: FaVrCardboard, title: "AR/VR Technology", description: "Experience the future of farming with immersive AR/VR.", link: "#", button: "Coming Soon...", isDisabled: true },
                    { icon: FaMicroscope, title: "Plant Disease Analyzer", description: "Identify plant diseases using AI-powered analysis.", link: "https://greenheart.streamlit.app/" },
                    { icon: FaSeedling, title: "Crop Recommendation", description: "Get personalized crop recommendations based on soil and climate.", link: "https://greenheart.streamlit.app/" }
                ].map((service, index) => (
                    <div key={index} className="bg-white rounded-lg transform hover:scale-101 shadow-md p-5 flex flex-col items-center text-center hover:shadow-lg transition-all">
                        <service.icon className="text-green-600 text-3xl" />
                        <h4 className="text-xl font-semibold mt-3">{service.title}</h4>
                        <p className="text-gray-600 mt-2">{service.description}</p>
                        {service.isDisabled ? (
                            <button className="mt-4 px-4 py-2 bg-gray-400 text-white rounded-lg cursor-not-allowed">{service.button}</button>
                        ) : (
                            <a href={service.link} className="mt-4 transition-transform transform hover:scale-105 inline-block px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">Try it!</a>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Services;