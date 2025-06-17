import React, { useState } from 'react';
import './FeaturedProjects.css';
import firstImg from "../../assets/firstImg.jpeg";
import { FaArrowLeft, FaArrowRight, FaTimes } from 'react-icons/fa';

const brands = [
  {
    name: 'Roberto Cavalli',
    description: 'Founded in 1970, Roberto Cavalli is a global icon of Italian luxury, blending creativity and craftsmanship. Its residences mirror the brand\'s glamour and attention to detail.',
    images: [firstImg, firstImg, firstImg]
  },
  {
    name: 'Mandarin Oriental',
    description: 'An iconic symbol of Asian hospitality, creating tranquil and luxurious living experiences.',
    images: [firstImg, firstImg, firstImg]
  },
  {
    name: 'Versace Home',
    description: 'The unmistakable Italian fashion house blends opulence and classical elegance into real estate.',
    images: [firstImg, firstImg, firstImg]
  },
  {
    name: 'de GRISOGONO',
    description: 'Swiss high jewelry brand reflecting elegance and contemporary artistry in residential design.',
    images: [firstImg, firstImg, firstImg]
  },
  {
    name: 'Paramount',
    description: 'Hollywood glam brought into your living space with bold designs and cinematic flair.',
    images: [firstImg, firstImg, firstImg]
  },
  {
    name: 'Trump',
    description: 'Refined luxury and world-class standards in every detail of these iconic developments.',
    images: [firstImg, firstImg, firstImg]
  },
  {
    name: 'Radisson',
    description: 'Global hospitality leader bringing smart, stylish living to upscale real estate.',
    images: [firstImg, firstImg, firstImg]
  },
  {
    name: 'Rotana',
    description: 'Middle East rooted hospitality with contemporary living for modern lifestyles.',
    images: [firstImg, firstImg, firstImg]
  }
];

const FeaturedProjects = () => {
  const [activeBrand, setActiveBrand] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const openModal = (brand) => {
    setActiveBrand(brand);
    setActiveIndex(0);
  };

  const closeModal = () => {
    setActiveBrand(null);
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % activeBrand.images.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + activeBrand.images.length) % activeBrand.images.length);
  };

  return (
    <section className="featured-section">
      <div className="featured-header">
        <h2>A NEW REALM OF CURATED COLLABORATIONS</h2>
        <p>
          DAMAC has worked closely with some of the world's most sought-after purveyors of luxury to create truly exquisite environments
        </p>
      </div>

      <div className="brand-grid">
        {brands.map((brand, index) => (
          <div key={index} className="brand-card" onClick={() => openModal(brand)}>
            <img src={brand.images[0]} alt={brand.name} />
            <div className="brand-name">{brand.name}</div>
          </div>
        ))}
      </div>

      {activeBrand && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={closeModal}><FaTimes /></button>
            <div className="modal-header">
              <h4>{activeBrand.name}</h4>
              <p>{activeBrand.description}</p>
            </div>

            <div className="carousel">
              <button className="carousel-arrow left" onClick={prevSlide}><FaArrowLeft /></button>
              <div className="carousel-image">
                <img src={activeBrand.images[activeIndex]} alt={`Slide ${activeIndex + 1}`} />
              </div>
              <button className="carousel-arrow right" onClick={nextSlide}><FaArrowRight /></button>
            </div>

            <div className="carousel-dots">
              {activeBrand.images.map((_, i) => (
                <span key={i} className={i === activeIndex ? "dot active" : "dot"}></span>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default FeaturedProjects;
