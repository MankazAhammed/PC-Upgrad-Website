import React from "react";
import "./FeaturedProjects.css";
// import white_wave_background from "../../assets/White_wave_bg.mp4";
import white_wave_background from "../../assets/blackBg.mp4";
import nakheel_logo from "../../assets/nakheel.png";
import sobha_logo from "../../assets/Sobha.png"
import meraas_logo from "../../assets/Meraas.png"
import Aldar from "../../assets/Aldar.png"
import Samana from "../../assets/Samana.png"

const FeaturedProjects = () => {
  return (
    <section className="featured-section">
      <video className="background-video" autoPlay loop muted playsInline>
        <source src={white_wave_background} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="background-overlay"></div>

      <div className="featured-header">
        <h2>OUR PREMIUM FRIEND</h2>
        <p>
          LORDS has worked closely with some of the world's most sought-after
          purveyors of luxury to create truly exquisite environments.
        </p>
      </div>

      
      <div className="logo-grid">
        <img src={nakheel_logo} alt="Nakheel Logo" className="award-logo" />
        <img src={sobha_logo} alt="Nakheel Logo" className="award-logo" />
        <img src={meraas_logo} alt="Nakheel Logo" className="award-logo" />
        <img src={Aldar} alt="Nakheel Logo" className="award-logo" />
        <img src={Samana} alt="Nakheel Logo" className="award-logo" />
        <img src={nakheel_logo} alt="Nakheel Logo" className="award-logo" />
        <img src={sobha_logo} alt="Nakheel Logo" className="award-logo" />
        <img src={meraas_logo} alt="Nakheel Logo" className="award-logo" />
        <img src={Aldar} alt="Nakheel Logo" className="award-logo" />
        <img src={Samana} alt="Nakheel Logo" className="award-logo" />
        {/* Later you can add more logos here */}
      </div>
      {/* Commented out rest of the brand/modal UI */}
      {/*
      <div className="featured-header">
        <h2>OUR PREMIUM PROJECTS</h2>
        <p>
          LORDS has worked closely with some of the world's most sought-after purveyors of luxury to create truly exquisite environments.
        </p>
      </div>

      <div className="brand-grid">
        {brands.map((brand, index) => (
          <div key={index} className="brand-card" onClick={() => openModal(brand)}>
            <img src={brand.logo} alt={brand.name} />
            <div className="brand-name">{brand.name}</div>
          </div>
        ))}
      </div>

      {activeBrand && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={closeModal}><FaTimes /></button>
            <div className="modal-header">
              <img src={activeBrand.logo} alt={`${activeBrand.name} Logo`} className="modal-logo" />
              <h4>{activeBrand.name}</h4>
              <p>{activeBrand.description}</p>
            </div>
            <div className="brand-video-wrapper">
              <video
                controls
                className="brand-video"
                autoPlay
                muted
                loop
                playsInline
              >
                <source src={activeBrand.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      )}
      */}
    </section>
  );
};

export default FeaturedProjects;
