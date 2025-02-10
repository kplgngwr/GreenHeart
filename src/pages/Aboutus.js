import React from 'react';
import './Aboutus.css';

// Import images
import missionImage from './media/mission.png';
import visionImage from './media/vision.png';
import team1Image from './media/team1.jpg';
import team2Image from './media/team2.jpg';
import team3Image from './media/team3.jpg';

function Aboutus() {
  return (
    <div className="aboutus-container">
      <header className="aboutus-header">
        <p>Discover our journey and mission to promote sustainable agriculture.</p>
      </header>

      <section className="aboutus-content">
        <div className="aboutus-section">
          <img src={missionImage} alt="Our Mission" className="aboutus-image" />
          <div className="aboutus-text">
            <h2>Our Mission</h2>
            <p>We aim to connect farmers and consumers through a sustainable platform that ensures fair trade and eco-friendly practices.</p>
          </div>
        </div>

        <div className="aboutus-section">
          <div className="aboutus-text">
            <h2>Our Vision</h2>
            <p>To create a world where agriculture is sustainable, transparent, and beneficial for all stakeholders involved.</p>
          </div>
          <img src={visionImage} alt="Our Vision" className="aboutus-image" />
        </div>

        <div className="aboutus-team">
          <h2>Meet Our Team</h2>
          <div className="team-members">
            <div className="team-member">
              <img src={team1Image} alt="Garvit Saluja" />
              <h3>Garvit Saluja</h3>
              <p>CEO</p>
            </div>
            <div className="team-member">
              <img src={team2Image} alt="Kapil Gangwar" />
              <h3>Kapil Gangwar</h3>
              <p>COO</p>
            </div>
            <div className="team-member">
              <img src={team3Image} alt="Vasu" />
              <h3>Vasu</h3>
              <p>CFO</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Aboutus;
