import React from 'react';
import missionImage from '/mission.png';
import visionImage from '/vision.png';
import team1Image from '/team1.jpg';
import team2Image from '/team2.jpg';
import team3Image from '/team3.jpg';

function Aboutus() {
  return (
    <div className="p-6 bg-gray-100 text-gray-900 font-sans ">
      <header className="flex justify-center items-center mb-10 text-center">
        <p className="text-3xl mt-4 text-green-800">Discover our journey and <span className="font-bold"> mission</span>  to promote <span className="font-bold"> sustainable</span>  agriculture.</p>
      </header>

      <section className="flex flex-col gap-5 py-10">
        <div className="flex flex-col md:flex-row items-center justify-center gap-5 animate-fadeInUp">
          <img src={missionImage} alt="Our Mission" className="w-72 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105" />
          <div className="max-w-lg">
            <h2 className="text-5xl font-bold text-green-700">Our Mission</h2>
            <p className="text-gray-600 font-semibold">We aim to connect farmers and consumers through a sustainable platform that ensures fair trade and eco-friendly practices.</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row-reverse items-center justify-center gap-5 animate-fadeInUp">
          <img src={visionImage} alt="Our Vision" className="w-72 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105" />
          <div className="max-w-lg">
            <h2 className="text-5xl font-bold text-green-700">Our Vision</h2>
            <p className="text-gray-600 font-semibold">To create a world where agriculture is sustainable, transparent, and beneficial for all stakeholders involved and a thriving agricultural ecosystem where farmers are empowered, consumers have access to fresh, quality produce, and the planet is protected.</p>
          </div>
        </div>
      </section>

      <div className="text-center mt-10 py-10 p-5 bg-gray-50 rounded-lg shadow-lg transition-transform duration-300 hover:translate-y-[-5px] hover:shadow-xl">
        <h2 className=" text-5xl font-bold text-green-700 mb-10">Meet Our Team</h2>
        <div className="flex flex-col md:flex-row justify-center gap-10">
          <div className="text-center animate-fadeIn">
            <img src={team1Image} alt="Garvit Saluja" className="w-36 h-36 rounded-full shadow-lg transition-transform duration-300 hover:scale-110" />
            <h3 className="text-xl text-gray-900 mt-2 font-semibold ">Garvit Saluja</h3>
            <p className="text-gray-600 font-bold">CEO</p>
          </div>
          <div className="text-center animate-fadeIn">
            <img src={team2Image} alt="Kapil Gangwar" className="w-36 h-36 rounded-full shadow-lg transition-transform duration-300 hover:scale-110" />
            <h3 className="text-xl text-gray-900 mt-2 font-semibold ">Kapil Gangwar</h3>
            <p className="text-gray-600 font-bold">COO</p>
          </div>
          <div className="text-center animate-fadeIn">
            <img src={team3Image} alt="Vasu" className="w-36 h-36 rounded-full shadow-lg transition-transform duration-300 hover:scale-110" />
            <h3 className="text-xl text-gray-900 mt-2 font-semibold ">Vasu</h3>
            <p className="text-gray-600 font-bold">CFO</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Aboutus;
