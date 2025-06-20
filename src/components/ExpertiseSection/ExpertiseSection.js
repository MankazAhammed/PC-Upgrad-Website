import React from 'react';
import './ExpertiseSection.css';
import firstImg from '../../assets/firstImg.jpeg';

export default function ExpertiseSection() {
  return (
    <section className="expertise-section">
      <div className="expertise-content">
        <h2 className="expertise-title">OUR EXPERTISE</h2>
        <p className="expertise-desc">
          Our luxury sales advisors bring a wealth of experience in assisting owners and investors in discovering properties that align seamlessly with their needs. With extensive knowledge of property trends, a solid grasp of industry insights, and an in-depth understanding of the local market, our advisors are dedicated to ensuring that your choice to invest in LORDS Properties is a confident and informed choice.
        </p>

        <div className="expertise-stats">
          <div>
            <h3>110+</h3>
            <p>Luxury sales advisors</p>
          </div>
          <div>
            <h3>20+</h3>
            <p>Sales offices</p>
          </div>
          <div>
            <h3>20+</h3>
            <p>Years of experience</p>
          </div>
        </div>

        <button className="expertise-button">GET IN TOUCH</button>
      </div>

      <div className="expertise-image">
        <img src={firstImg} alt="Expertise" />
      </div>
    </section>
  );
}
