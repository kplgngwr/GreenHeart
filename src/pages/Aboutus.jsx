import React from 'react';
import { motion } from 'framer-motion';
import { Flag, Eye, Users } from 'lucide-react';
import missionImage from '/mission.png';
import visionImage from '/vision.png';
import team2Image from '/team2.jpg';

export default function Aboutus() {
  return (
    <div className="p-8 bg-teal-50 text-gray-900 font-sans">
      {/* Header */}
      <header className="max-w-5xl mx-auto text-center mb-16">
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-teal-800"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Discover our journey and <span className="text-teal-700">mission</span> to promote{' '}
          <span className="text-teal-700">sustainable</span> agriculture.
        </motion.h1>
      </header>

      {/* Mission & Vision */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        <motion.div
          className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center"
          whileHover={{ scale: 1.03 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <img
            src={missionImage}
            alt="Our Mission"
            className="w-64 h-40 object-cover rounded-lg mb-6 shadow-md"
          />
          <h2 className="text-3xl font-semibold text-teal-800 mb-4">Our Mission</h2>
          <p className="text-teal-700 leading-relaxed">
            We aim to connect farmers and consumers through a sustainable platform that ensures fair trade
            and eco-friendly practices.
          </p>
        </motion.div>

        <motion.div
          className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center"
          whileHover={{ scale: 1.03 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <img
            src={visionImage}
            alt="Our Vision"
            className="w-64 h-40 object-cover rounded-lg mb-6 shadow-md"
          />
          <h2 className="text-3xl font-semibold text-teal-800 mb-4">Our Vision</h2>
          <p className="text-teal-700 leading-relaxed">
            To create a world where agriculture is transparent and beneficial for all stakeholders—
            empowering farmers and protecting our planet.
          </p>
        </motion.div>
      </section>

      {/* Team Section */}
      <section className="max-w-6xl mx-auto mt-20 text-center">
        <motion.h2
          className="text-4xl font-bold text-teal-800 mb-10"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Meet Our Team&nbsp;— Techno Tuners
        </motion.h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
          {[
            { name: 'Ashit Rai', img: "https://i.postimg.cc/MHPR61RZ/image.png" },
            { name: 'Kapil Gangwar', img: team2Image },
            { name: 'Alok Kumar Yadav', img: 'https://i.postimg.cc/KYJWyHzd/image.png' },
            { name: 'Bhumi Kapoor', img: 'https://i.postimg.cc/cCHhBxBH/image.png' }
          ].map((member) => (
            <motion.div
              key={member.name}
              className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center"
              whileHover={{ translateY: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <img
                src={member.img}
                alt={member.name}
                className="w-32 h-32 rounded-full object-cover mb-4 shadow-md"
              />
              <h3 className="text-xl font-semibold text-teal-800">{member.name}</h3>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}


