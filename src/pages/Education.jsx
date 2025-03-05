import React from 'react';
import video from '/Education1.mp4';

function Education() {
    return (
        <div className="p-5 max-w-5xl mx-auto font-sans">
            <h1 className="text-center text-3xl text-pink-600 mb-2">Educational Videos & Content</h1>
            <p className="text-center text-gray-700">Feel free to request your query to be answered by our agriculture experts.</p>
            
            <div className="flex flex-col md:flex-row gap-5 mt-5">
                {/* Left Section */}
                <div className="flex-1">
                    <div className="mb-5">
                        <h2 className="text-center text-2xl text-green-600">Watch Video</h2>
                        <div className="relative pt-[56.25%] h-0 overflow-hidden bg-black">
                            <video controls className="absolute top-0 left-0 w-full h-full">
                                <source src={video} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </div>
                    <div className="mb-5">
                        <h3 className="text-center text-xl text-green-600">Learn About Organic Farming</h3>
                        <p className="text-gray-700 text-center">Explore various techniques and methods to enhance your farming practices...</p>
                    </div>
                    <div>
                        <h3 className="text-center text-xl text-green-600">Comments</h3>
                        <textarea className="w-full border border-gray-300 rounded p-2 mt-2" placeholder="Leave a comment..." rows="4"></textarea>
                        <button className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Submit Comment</button>
                    </div>
                </div>

                {/* Right Section */}
                <div className="flex-1 bg-gray-100 p-5 rounded-lg shadow-lg">
                    <h2 className="text-center text-2xl text-green-600">Contact Us</h2>
                    <form className="flex flex-col mt-4">
                        <label htmlFor="name" className="text-gray-700 mb-1">Name:</label>
                        <input type="text" id="name" name="name" required className="border border-gray-300 rounded p-2 mb-4" />

                        <label htmlFor="email" className="text-gray-700 mb-1">Email:</label>
                        <input type="email" id="email" name="email" required className="border border-gray-300 rounded p-2 mb-4" />

                        <label htmlFor="query" className="text-gray-700 mb-1">Your Query:</label>
                        <textarea id="query" name="query" rows="4" required className="border border-gray-300 rounded p-2 mb-4"></textarea>

                        <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Education;