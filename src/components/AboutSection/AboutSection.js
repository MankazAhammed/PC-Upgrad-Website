import React from 'react';
import { FaBuilding, FaHome } from 'react-icons/fa';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { BsFillBuildingsFill } from 'react-icons/bs';
import './AboutSection.css';

const stats = [
  {
    icon: <HiOutlineLocationMarker className="react-icon" />,
    title: 'Est. 2002',
    subtitle: 'In Dubai, UAE',
  },
  {
    icon: <FaHome className="react-icon" />,
    title: '48,000+',
    subtitle: 'Homes delivered*',
  },
  {
    icon: <FaBuilding className="react-icon" />,
    title: '50,000+',
    subtitle: 'In planning and progress*',
  },
  {
    icon: <BsFillBuildingsFill className="react-icon" />,
    title: '100+ M SQFT',
    subtitle: 'Project area in planning and progress',
  },
  {
    icon: <FaBuilding className="react-icon" />,
    title: '6',
    subtitle: 'Master communities',
  },
];

const AboutSection = () => {
  return (
    <section className="developer-section">
      <div className="developer-heading">
        <h2>THE PREMIER LUXURY PROPERTY DEVELOPER IN DUBAI</h2>
        <a href="#" className="discover-link">DISCOVER LORDS</a>
      </div>

      <div className="developer-grid">
        {stats.map((item, index) => (
          <div className="developer-card" key={index}>
            {item.icon}
            <h3>{item.title}</h3>
            <p>{item.subtitle}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutSection;
