import React, { useRef } from 'react';
import './WhyLords.css';
import firstImg from "../../assets/firstImg.jpeg"
import secondImg from "../../assets/luxury-architecture-exterior-design.jpg"
import thirdImg from "../../assets/luxury-waterfront-homes-sunset.jpg"
import fourthImg from "../../assets/vertical-view-dubai-city-from-top-tower.jpg"
import five from "../../assets/fifth.jpg";
import six from "../../assets/six.jpg";
import seven from "../../assets/seven.jpg";
import twele from "../../assets/twele.jpg";
import eight from "../../assets/eight.jpg";

const cards = [
  {
    title: 'UAE GOLDEN VISA BENEFITS',
    desc: 'Real estate investments in Dubai can grant you long-term residency and exclusive Golden Visa benefits.',
    image: twele,
  },
  {
    title: 'PREMIUM HEALTHCARE',
    desc: 'With strong healthcare investments, the city is ideal for supporting your health and wellbeing.',
    image: secondImg,
  },
  {
    title: 'WORLD CLASS EDUCATION',
    desc: 'Dubai offers top-tier schools and universities with globally recognized curricula, ideal for families and expatriates.',
    image: thirdImg,
  },
  {
    title: 'ENTERTAINMENT HUB',
    desc: 'From iconic landmarks to theme parks and cultural events, Dubai is a world-class entertainment destination.',
    image: fourthImg,
  },
  {
    title: 'COMMUNITY SAFETY',
    desc: 'The UAE ranks as one of the safest countries globally, with well-developed, effective law enforcement systems.',
    image: five,
  },
  {
    title: 'WORLD CLASS EDUCATION',
    desc: 'Dubai offers top-tier schools and universities with globally recognized curricula, ideal for families and expatriates.',
    image: six,
  },
  {
    title: 'ENTERTAINMENT HUB',
    desc: 'From iconic landmarks to theme parks and cultural events, Dubai is a world-class entertainment destination.',
    image: seven,
  },
  {
    title: 'COMMUNITY SAFETY',
    desc: 'The UAE ranks as one of the safest countries globally, with well-developed, effective law enforcement systems.',
    image: eight,
  },
];

export default function WhyLords() {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: dir === 'left' ? -500 : 500,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="why-dubai-section">
      <h2 className="why-dubai-title">WHY DUBAI?</h2>
      <div className="slider-container">
        <div className="slider" ref={scrollRef}>
          {cards.map((card, index) => (
            <div className="card" key={index}>
              <img src={card.image} alt={card.title} />
              <div className="card-text">
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="slider-controls">
          <button onClick={() => scroll('left')}>← ARROW-LEFT</button>
          <button onClick={() => scroll('right')}>ARROW-RIGHT →</button>
        </div>

        <div className="progress-bar">
          <div className="progress-line" />
        </div>
      </div>
    </section>
  );
}
