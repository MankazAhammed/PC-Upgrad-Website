import React, { useRef } from "react";
import "./About.css";
import firstImg from "../../assets/firstImg.jpeg";
import {
  FaTrophy,
  FaHandsHelping,
  FaDraftingCompass,
  FaCity,
  FaArrowLeft,
  FaArrowRight,
  FaUserTie,
} from "react-icons/fa";
import Footer from "../Footer/Footer";

export default function About() {
  const leaderScrollRef = useRef(null);

  const scrollLeaders = (dir) => {
    if (leaderScrollRef.current) {
      leaderScrollRef.current.scrollBy({
        left: dir === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="about-page">
      {/* SECTION 1 - ABOUT */}
      <section className="about-intro">
        <h1>ABOUT LORDS</h1>
        <p>
          The LORDS Group of Companies established its property development
          division with the formation of LORDS Properties in 2002, which has
          since grown and expanded to become a globally recognised brand.
        </p>

        <div className="md-details">
  <div className="md-headshot">
    <FaUserTie className="md-icon" />
    <div className="md-name-title">
      <h4>Sudarshan Shetty</h4>
      <p>Managing Director</p>
    </div>
  </div>
  <div className="md-bio">
    <h3>Meet Our Managing Director</h3>
    <p>
      Sudarshan Shetty is a visionary leader driving LORDS Properties
      forward with his strategic foresight and dedication to excellence.
      With over two decades of experience in real estate and
      investments, he has played a pivotal role in shaping iconic
      developments across the region. His passion for innovation and
      commitment to quality continue to inspire the entire organization.
    </p>
  </div>
</div>

      </section>

      {/* SECTION 2 - LUXURY STATS */}
      <section className="luxury-stats">
        <h2>A WORLD OF LUXURY</h2>
        <p className="luxury-text">
          From world-class master communities and luxurious residential towers
          to expansive master-planned developments and exclusive island resort
          residences, LORDS Properties is renowned for creating projects that
          blend innovative design with exceptional amenities.
        </p>

        <div className="luxury-grid">
          <div className="luxury-item">
            <FaHandsHelping className="luxury-icon" />
            <h3>48,000+</h3>
            <p>Units delivered</p>
          </div>
          <div className="luxury-item">
            <FaCity className="luxury-icon" />
            <h3>50,000+</h3>
            <p>Units in progress and planning</p>
          </div>
          <div className="luxury-item">
            <FaDraftingCompass className="luxury-icon" />
            <h3>100+ M Sq.ft.</h3>
            <p>Project area in planning and progress</p>
          </div>
        </div>
      </section>

      {/* SECTION 3 - LEADERSHIP */}
      {/* <section className="leadership">
        <h2>LEADERSHIP TEAM</h2>
        <p>
          Our top management is deeply involved in shaping the company’s
          long-term strategy, performance, culture, and values.
        </p>

        <div className="leader-scroll-wrapper">
          <button
            className="scroll-arrow left"
            onClick={() => scrollLeaders("left")}
          >
            <FaArrowLeft />
          </button>

          <div className="leaders" ref={leaderScrollRef}>
            {[...Array(6)].map((_, index) => (
              <div key={index} className="leader-card">
                <img src={firstImg} alt={`Leader ${index + 1}`} />
                <div className="leader-text">
                  <h4>
                    {
                      [
                        "ALI SAJWANI",
                        "AMIRA SAJWANI",
                        "ABBAS SAJWANI",
                        "ESSA IBRAHIM",
                        "SOFYAN KHATIB",
                        "SANDIP BHATT",
                      ][index]
                    }
                  </h4>
                  <p>
                    {
                      [
                        "Managing Director",
                        "Managing Director",
                        "Board Member",
                        "VP – Investments",
                        "Group Director",
                        "Chief Investment Officer",
                      ][index]
                    }
                  </p>
                </div>
              </div>
            ))}
          </div>

          <button
            className="scroll-arrow right"
            onClick={() => scrollLeaders("right")}
          >
            <FaArrowRight />
          </button>
        </div>
      </section> */}

      {/* SECTION 4 - AWARDS */}
      <section className="awards">
        <h2>LATEST AWARDS</h2>
        <p>
          LORDS Properties accolades reflect our commitment to excellence,
          innovation, and leadership in real estate.
        </p>
        <div className="award-grid">
          {[
            "GLOBAL BUSINESS OUTLOOK AWARDS CEREMONY",
            "WORLD BUSINESS OUTLOOK AWARDS",
            "18TH GLOBAL RLI AWARDS",
            "REAL ESTATE COMMUNITY SUMMIT (IRECMS)",
            "CONSTRUCTION WEEK MIDDLE EAST",
            "CXO INSIGHT",
            "REZA AWARDS",
            "GEC AWARDS",
            "TRAVELERS' CHOICE AWARD",
            "LEADERS IN HOSPITALITY - UAE",
          ].map((title, idx) => (
            <div className="award-card" key={idx}>
              <FaTrophy className="award-icon" />
              <p>{title}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
