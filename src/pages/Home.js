import React from 'react';
import './Home.css';

// Import media files
import bcgVideo from './media/bcg3.mp4';
import grainImage from './media/r1.png';
import nutsImage from './media/r2.png';
import greenCoffeeImage from './media/r3.png';
import oliveImage from './media/r4.png';
import heroImage from './media/heroimg1.jpg';
import thumbnailImage from './media/Thumbnail.png';
import workflowImage from './media/workflow.png';
import workingImage from './media/WORKING.jpg';
import servicesImage from './media/2..png';
import feature1Image from './media/1.png';
import feature2Image from './media/2.png';
import feature3Image from './media/3.png';
import feature4Image from './media/4.png';

function Home() {
  return (
    <div id="main">
      <div id="bcgcontainer">
        <video autoPlay loop muted src={bcgVideo}></video>
        <div id="aboveimg">

          <div id="subbcgcontainer1">
            <div id="heading">
              <h1>Connect with a global network of consumers who value sustainable farming practices.</h1>
              <h2>Empowering Farmers , Enriching Communities</h2>
            </div>
            <div id="socialhandelandsigns">
              <button>Sign in</button>
              <div id="links">
                <a href="https://youtube.com">
                  <img src="https://agrimp.com/assets/icons/youtube-d50ddd3463fca6474d8f6208acfe7fb9b6df4fd0115c7236be8ac898ff2950ec.png" alt="YouTube" />
                </a>
                <a href="https://facebook.com">
                  <img src="https://agrimp.com/assets/icons/facebook-095327a666a198711f2d886aca1aa54bc94eab123b47eb21143ca6371903c101.png" alt="Facebook" />
                </a>
                <a href="https://instagram.com">
                  <img src="https://agrimp.com/assets/icons/instagram-9be5bfed286b4ddea96d55630886df1171ce5b0373e678223fb985ba42b2962b.png" alt="Instagram" />
                </a>
                <a href="https://twitter.com">
                  <img src="https://agrimp.com/assets/icons/twitter-decee6f4cc18e3928008dc9752990a79882421798c13b7a05add80724dcdde7b.png" alt="Twitter" />
                </a>
                <a href="https://linkedin.com">
                  <img src="https://agrimp.com/assets/icons/linkedin-86c3b329b493ce57e613118b55c8ddb281948e9953d386bb4e475ce04c7d24ab.png" alt="LinkedIn" />
                </a>
              </div>
            </div>

          </div>
          <div id="subbcgcontainer2">
            <h3>Sell/Buy Products</h3>
            <div id="twopics1">
              <div className="roundpic">
                <img src={grainImage} alt="Grain" />
                <h4>GRAIN</h4>
              </div>
              <div className="roundpic">
                <img src={nutsImage} alt="Nuts" />
                <h4>NUTS</h4>
              </div>
            </div>
            <div id="twopics2">
              <div className="roundpic">
                <img src={greenCoffeeImage} alt="Green Coffee" />
                <h4>GREEN COFFEE</h4>
              </div>
              <div className="roundpic">
                <img src={oliveImage} alt="Olive" />
                <h4>OLIVE</h4>
              </div>
            </div>
            <div id="cantfind">
              <h3>Can't Find the product?</h3>
            </div>
            <div id="talkbutton">
              <button>Talk to us</button>
            </div>
          </div>
        </div>
      </div>

      <div className="main-div">
        <h1>Connect Farmers and Buyers. Grow Your Business Together</h1>
        <p className="subheading">Green Heart Marketplace is a digital B2B platform that simplifies agricultural transactions, ensuring fair prices and efficient delivery.</p>

        <div className="sub-div sub-div1">
          <img src={heroImage} alt="Agriculture" />
        </div>

        <div className="sub-div sub-div2">
          <p>Our Vision: To create a thriving agricultural ecosystem where farmers are empowered, consumers have access to fresh, quality produce, and the planet is protected.</p>
          <p>Agri Marketplace empowers farmers with direct market access, fair prices, and reduces the burden of middlemen. Our user-friendly platform provides transparent information, secure transactions, and reliable logistics, fostering trust and confidence.</p>
          <button className="btn">Join Us</button>
          <button className="btn">Learn more about Us</button>
        </div>

        <div className="sub-div sub-div3">
          <ul>
            <li>Dual platform application</li>
            <li>IoT-based soil and climate analysis</li>
            <li>Augmented Reality Integration</li>
            <li>Direct marketplace for agricultural needs</li>
            <li>A user-friendly platform that generates market opportunity for farmers and industry buyers.</li>
            <li>Integrated and secure platform payment processes.</li>
            <li>Tailored product quality verification and logistic services.</li>
            <li>A market with only verified buyers and sellers.</li>
            <li>Customer support & insight.</li>
          </ul>
        </div>
        <div className="sub-div sub-div4">
          <a href="https://youtu.be/qwGr65r0E8I" target="_blank" rel="noopener noreferrer">
            <img src={thumbnailImage} alt="Video Thumbnail" />
          </a>
        </div>
      </div>

      <div id="page2">
        <div id="ourval">
          <h2>Our <span>value</span> proposition</h2>
          <p>GreenHeart: Bridging the gap between farmers and consumers, fostering sustainable agriculture, and promoting healthy, chemical-free food.</p>
        </div>
        <div id="vdbox">
          <img src={workflowImage} alt="Workflow Mind Map" />
        </div>
      </div>

      <div id="page3">
        <div id="box1">
          <div id="subheading">
            <h2><span>How</span> it works</h2>
            <h4>take a look at our <span>platform demo</span></h4>
          </div>
          <div id="steps">
            <ol>
              <li>Join our community by signing up on the GreenHeart</li>
              <li>Create Your Profile</li>
              <li>List or Explore Products</li>
              <li>Set Prices and Quantities</li>
              <li>Connect and Transact</li>
              <li>Choose Delivery Options</li>
              <li>Track Orders and Provide Feedback</li>
            </ol>
          </div>
        </div>
        <div id="box2">
          <img src={workingImage} alt="Platform Demo" />
        </div>
        </div>

      <div id="page4">
        <div id="subheading">
          <h2>OUR <span>SERVICES</span></h2>
          <p>GreenHeart offers a comprehensive suite of services to connect farmers and consumers, promote sustainable agriculture, and ensure the delivery of fresh, healthy produce.</p>
        </div>
        <div id="flowchartservic">
          <img src={servicesImage} alt="Services Flowchart" />
        </div>
      </div>

      <div id="page5">
        <div id="subheading">
          <h2>KEY <span>FEATURES</span></h2>
          <p>GreenHeart offers a range of innovative features to streamline agricultural transactions and promote sustainable practices.</p>
        </div>
        <div id="fourcard">
          <div className="cards" id="one">
            <img src={feature1Image} alt="Farmer-Consumer Connect" />
            <h2>Farmer-Consumer Connect</h2>
            <p>Facilitate direct interactions between farmers and consumers, eliminating the need for intermediaries.</p>
          </div>
          <div className="cards" id="two">
            <img src={feature2Image} alt="Sustainable Farming Practices" />
            <h2>Sustainable Farming Practices</h2>
            <p>Promote eco-friendly farming methods, such as organic agriculture and reduced chemical usage.</p>
          </div>
          <div className="cards" id="three">
            <img src={feature3Image} alt="Quality Assurance 100%" />
            <h2>Quality Assurance 100%</h2>
            <p>Implement rigorous quality control measures to ensure the delivery of fresh, healthy produce.</p>
          </div>
          <div className="cards" id="four">
            <img src={feature4Image} alt="Educational Resources" />
            <h2>Educational Resources</h2>
            <p>Provide farmers with access to valuable information and training on sustainable farming techniques.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home; 