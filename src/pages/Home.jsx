import React from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle,
  Globe,
  Layers,
  Activity,
  Zap,
  MapPin,
  BarChart
} from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen ">


      <div className="video-container relative h-[70vh] w-full overflow-hidden">
        <video autoPlay loop muted playsInline className="background-video absolute top-1/2 left-1/2 w-full h-full object-cover transform -translate-x-1/2 -translate-y-1/2">
          <source src="/bcg3.mp4" type="video/mp4" />
        </video>
        <div className="overlay absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex flex-col items-center justify-center text-white text-center p-5">
          <h1 className="font-bold">Connect with a global network of consumers who value sustainable farming practices.</h1>
          <h2 className=" text-green-500 font-semibold">Empowering <span className="text-white">Farmers</span> , Enriching Communities</h2>
        </div>
      </div>

      {/* Challenges Section */}
      {/* Challenges Section */}
      <section id="challenges" className="py-20 px-6 bg-teal-50">
        <motion.h2
          className="text-4xl font-bold text-teal-800 text-center mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          The Challenge We Aim to Address
        </motion.h2>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 text-teal-700">
          {/* Left column: Intro & Conclusion */}
          <div className="space-y-6">
            <p className="leading-relaxed">
              Every season, millions of Indian farmers decide what to grow by relying on tradition,
              neighbors, or past trends—without knowing the real suitability or market potential for
              each crop.
            </p>
            <p className="leading-relaxed">
              The result? Monocultures, unexpected price crashes, and wasted opportunity on even the
              most fertile lands. GreenHeart steps in with data-driven, localized insights that bring
              confidence back to planting decisions.
            </p>
          </div>

          {/* Right column: Bullet list with icons */}
          <div className="space-y-6">
            <div className="flex items-start">
              <CheckCircle className="mt-1 mr-4 h-7 w-7 text-teal-600" />
              <span>Whether a crop truly suits their soil profile, water availability, and local climate</span>
            </div>
            <div className="flex items-start">
              <CheckCircle className="mt-1 mr-4 h-6 w-6 text-teal-600" />
              <span>Whether market demand for that crop is rising, stable, or declining</span>
            </div>
            <div className="flex items-start">
              <CheckCircle className="mt-1 mr-4 h-9 w-9 text-teal-600" />
              <span>How to segment their land optimally between short-cycle, staple, and long-term plantation crops</span>
            </div>
          </div>
        </div>
      </section>


      {/* Stats & Facts Section */}
      <section id="stats" className="py-20 px-6 bg-white">
        <motion.h2
          className="text-4xl font-bold text-teal-800 text-center mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Quick Stats & Facts
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <motion.div
            className="p-8 rounded-2xl bg-gradient-to-br from-teal-500 to-teal-600 text-white text-center shadow-2xl"
            whileHover={{ y: -10 }}
          >
            <CheckCircle className="mx-auto mb-4 h-12 w-12" />
            <div className="text-5xl font-bold">35%</div>
            <p className="uppercase tracking-wide mt-2">Yield Increase</p>
          </motion.div>

          <motion.div
            className="p-8 rounded-2xl bg-teal-50 border-2 border-teal-300 text-teal-800 text-center shadow-lg"
            whileHover={{ scale: 1.05 }}
          >
            <Globe className="mx-auto mb-4 h-12 w-12 text-teal-600" />
            <div className="text-5xl font-bold">20%</div>
            <p className="mt-2">Cost Reduction</p>
          </motion.div>

          <motion.div
            className="p-8 rounded-2xl bg-teal-100 text-teal-800 text-center shadow-lg flex flex-col items-center"
            whileHover={{ x: 10 }}
          >
            <Layers className="mb-4 h-12 w-12 text-teal-600" />
            <div className="text-4xl font-bold">100+</div>
            <p className="mt-2">Districts Covered</p>
          </motion.div>

          <motion.div
            className="p-8 rounded-2xl bg-white text-teal-700 text-center shadow-lg"
            whileHover={{ rotate: 2 }}
          >
            <BarChart className="mx-auto mb-4 h-12 w-12 text-teal-600" />
            <h3 className="text-xl font-semibold mb-2">Key Languages</h3>
            <div className="grid grid-cols-2">
              <p>Hindi</p>
              <p>Marathi</p>
              <p>Punjabi</p>
              <p>Tamil & more</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Features Section */}
      <section id="features" className="py-20 px-6 bg-teal-50">
        <motion.h2
          className="text-4xl font-bold text-teal-800 text-center mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Core Features
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            {
              icon: <Activity className="h-8 w-8 text-teal-600" />,
              title: 'Smart Land Zoning',
              desc: 'Auto-divide your fields with satellite & terrain data for optimal zones.'
            },
            {
              icon: <Zap className="h-8 w-8 text-teal-600" />,
              title: 'AI Recommendations',
              desc: 'Deep learning suggests best crops based on cost, yield & market trends.'
            },
            {
              icon: <MapPin className="h-8 w-8 text-teal-600" />,
              title: 'Regional Insights',
              desc: 'Localized forecasts & risk analysis powered by district-level data.'
            },
            {
              icon: <CheckCircle className="h-8 w-8 text-teal-600" />,
              title: 'Voice Advisory',
              desc: 'AI calls & WhatsApp alerts in multiple languages for easy access.'
            },
            {
              icon: <Globe className="h-8 w-8 text-teal-600" />,
              title: 'Sensor Monitoring',
              desc: 'Integrate IoT & NDVI for real-time crop health tracking.'
            },
            {
              icon: <Layers className="h-8 w-8 text-teal-600" />,
              title: 'Insurance Validation',
              desc: 'Satellite data-driven anomaly detection speeds up claims.'
            }
          ].map((f, i) => (
            <motion.div
              key={i}
              className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-transform"
              whileHover={{ scale: 1.03 }}
            >
              <div className="mb-4 flex items-center justify-center">
                {f.icon}
              </div>
              <h3 className="text-2xl font-semibold text-teal-800 mb-2 text-center">
                {f.title}
              </h3>
              <p className="text-teal-600 text-center">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* USP Section */}
      <section id="usp" className="py-20 px-6 bg-white">
        <motion.h2
          className="text-4xl font-bold text-teal-800 text-center mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Unique Selling Propositions
        </motion.h2>
        <div className="max-w-4xl mx-auto space-y-6 text-teal-700">
          {[
            'Smart Zoning + Auto Planning',
            'Localized AI Recommendations',
            'Voice-Based Reporting',
            'Pattern Recognition + Drone-Zone Generation',
            'Ground Sensor & Insurance Validation'
          ].map((usp, idx) => (
            <motion.div
              key={idx}
              className="flex items-start space-x-4 text-xl"
              whileHover={{ x: 5 }}
            >
              <CheckCircle className="mt-1 h-8 w-8 text-teal-600" />
              <p className="font-medium">{usp}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Impact & Benefits Section */}
      <section id="impact" className="py-20 px-6 bg-teal-50">
        <motion.h2
          className="text-4xl font-bold text-teal-800 text-center mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Impact & Benefits
        </motion.h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 text-teal-700">
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-teal-800">Farmer Empowerment</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Empowers small & marginal farmers with AI-driven land zoning.</li>
              <li>Enables data-backed decisions to boost income.</li>
              <li>Reduces dependency on middlemen & outdated advice systems.</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-teal-800">Productivity & Economic Impact</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>25–35% yield increase via optimized inputs and planning.</li>
              <li>15–20% cost reduction through targeted spraying & water efficiency.</li>
              <li>Creates rural digital jobs in agri-data analytics & drone ops.</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-teal-800">Risk Reduction & Insurance Confidence</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Predictive analytics & early warnings reduce crop failure risk.</li>
              <li>Verifiable satellite & sensor data boosts insurer confidence.</li>
              <li>Anomaly reports speed up claim processing.</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-teal-800">Sustainability & Food Security</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Promotes crop rotation & biodiversity for soil health.</li>
              <li>Supports climate-resilient agriculture initiatives.</li>
              <li>Contributes to stable food supply & rural prosperity.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
