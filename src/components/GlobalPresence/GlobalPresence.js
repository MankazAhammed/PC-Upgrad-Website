import React from 'react';
import './GlobalPresence.css';
import thiteen from "../../assets/thiteen.jpg";
import six from "../../assets/six.jpg"
import seven from "../../assets/seven.jpg"
import eight from "../../assets/eight.jpg"
import eleven from "../../assets/eleven.jpg"

const logos = [
  { image: thiteen, title: 'SEAVIEWS', location: 'Doha, Qatar' },
  { image: eleven, title: 'DAMAC TOWERS RIYADH', location: 'Riyadh, Saudi Arabia' },
  { image: seven, title: 'MANDARIN ORIENTAL', location: 'Malé, Maldives' },
  { image: eight, title: 'DAMAC TOWER BEIRUT', location: 'Beirut, Lebanon' },
  { image: six, title: 'SEAVIEWS', location: 'Doha, Qatar' },
];

export default function GlobalPresence() {
  return (
    <section className="global-presence-section">
      <h2 className="section-title">OUR GLOBAL PRESENCE</h2>

      <div className="slider-wrapper top">
        <div className="slider-track">
          {[...logos, ...logos].map((item, i) => (
            <div className="slider-card" key={`top-${i}`}>
              <img src={item.image} alt={item.title} />
              <div className="overlay">
                <h3>{item.title}</h3>
                <p>{item.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="slider-wrapper bottom">
        <div className="slider-track reverse">
          {[...logos, ...logos].map((item, i) => (
            <div className="slider-card" key={`bottom-${i}`}>
              <img src={item.image} alt={item.title} />
              <div className="overlay">
                <h3>{item.title}</h3>
                <p>{item.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
