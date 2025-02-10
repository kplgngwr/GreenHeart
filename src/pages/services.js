import React from 'react';
import './services.css'; // Ensure the CSS file is imported
import { FaShoppingBasket, FaChalkboardTeacher, FaVrCardboard, FaSeedling, FaMicroscope } from 'react-icons/fa';

const Services = () => {
    return (
        <div>
            <div className="hero-section">
                <div className="hero-content">
                    <h1>Our Services</h1>
                    <div className="hero-buttons">
                        <a href="/home" className="btn btn-home">Home</a>
                        <button className="btn btn-product">Services</button>
                    </div>
                </div>
            </div>

            <div className="section">
                <div className="container">
                    <div className="heading">
                        <div className="container header">
                            <h6>Services</h6>
                            <h1 className="display-5">Organic Farm Services</h1>
                            <p>Empower organic farmers with modern technology, connect them to a thriving marketplace, and foster sustainable practices. Experience the best in organic produce.</p>
                            <a href="/aboutus" className="btn btn-primary">Contact Us</a>
                        </div>
                    </div>


                    <div className="row">
                        <div className="col">
                            <a href="/market">
                                <div className="card">
                                    <FaShoppingBasket className="React-icon" />
                                    <h4>Fresh and Organic Produce</h4>
                                    <p>Discover a vibrant selection of fresh, locally sourced, and certified organic produce. Support sustainable farming and enjoy the taste of nature.</p>
                                    <button className="btn btn-primary">Try it!</button>
                                </div>
                            </a>
                        </div>
                        <div className="col">
                            <a href="/detail">
                                <div className="card">
                                    <FaChalkboardTeacher className="React-icon" />
                                    <h4>Educational Content</h4>
                                    <p>Access valuable resources and expert knowledge on organic farming practices, sustainable agriculture, and the latest in agritech.</p>
                                    <button className="btn btn-primary">Try it!</button>
                                </div>
                            </a>
                        </div>
                        <div className="col">
                            <div className="card">
                                <FaVrCardboard className="React-icon" />
                                <h4>AR/VR Technology</h4>
                                <p>Experience the future of farming with immersive AR/VR technologies. Visualize crop growth, diagnose issues, and receive personalized guidance in a virtual environment.</p>
                                <button className="btn btn-secondary">Coming Soon...</button>
                            </div>
                        </div>
                        <div className="col">
                            <a href="https://greenheart.streamlit.app/">
                                <div className="card">
                                    <FaMicroscope className="React-icon" />
                                    <h4>Plant Disease Analyzer</h4>
                                    <p>Quickly and accurately identify plant diseases using our AI-powered analyzer. Protect your crops from damage and maximize your yields with early detection and effective treatment.</p>
                                    <button className="btn btn-primary">Try it!</button>
                                </div>
                            </a>
                        </div>
                        <div className="col">
                            <a href="https://greenheart.streamlit.app/">
                                <div className="card">
                                    <FaSeedling className="React-icon" />
                                    <h4>Crop Recommendation</h4>
                                    <p>Receive personalized crop recommendations based on your soil conditions, climate, and market demands. Optimize your planting decisions and increase your profitability.</p>
                                    <button className="btn btn-primary">Try it!</button>
                                </div>
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Services;
