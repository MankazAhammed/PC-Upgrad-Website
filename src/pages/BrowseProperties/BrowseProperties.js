import React from "react";
import "./BrowseProperties.css";
import firstImg from "../../assets/eight.jpg";
import five from "../../assets/fifth.jpg";
import six from "../../assets/six.jpg";
import thiteen from "../../assets/thiteen.jpg";

const properties = [
  {
    name: "CHELSEA RESIDENCES",
    location: "Dubai Maritime City, Dubai",
    price: "From AED 3,149,000",
    type: "1-2 BR, Apartment",
    image: firstImg,
  },
  {
    name: "DAMAC Riverside Views",
    location: "DAMAC Riverside Community, Dubai",
    price: "From AED 1,293,000",
    type: "1-2 BR, Apartment",
    image: five,
  },
  {
    name: "ELO 3",
    location: "DAMAC Hills 2, Dubai",
    price: "From AED 1,311,000",
    type: "2 BR, Apartment",
    image: six,
  },
  {
    name: "Safa Gate",
    location: "Sheikh Zayed Road, Dubai",
    price: "From AED 1,176,000",
    type: "1-2 STD BR, Apartment",
    image: thiteen,
  },
];

export default function BrowseProperties() {
  return (
    <div className="browse-page">
      {/* FILTER SECTION */}
      <div className="filters">
        <div className="filter-group">
          <label>All locations</label>
          <select>
            <option>All</option>
            <option>Dubai Hills</option>
            <option>Business Bay</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Property Type</label>
          <select>
            <option>Any</option>
            <option>Apartment</option>
            <option>Villa</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Bedrooms</label>
          <select>
            <option>Any</option>
            <option>1 BR</option>
            <option>2 BR</option>
            <option>3+ BR</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Price</label>
          <select>
            <option>Any</option>
            <option>Below 1M</option>
            <option>1M - 2M</option>
            <option>2M+</option>
          </select>
        </div>
      </div>

      {/* RESULT COUNT */}
      <div className="result-count">4 RESULTS FOUND</div>

      {/* PROPERTY CARDS */}
      <div className="property-grid">
        {properties.map((p, i) => (
          <div className="property-card" key={i}>
            <div className="card-image">
              <img src={p.image} alt={p.name} />
              <button className="view-btn">View Details</button>
            </div>
            <div className="card-content">
              <h4>{p.name}</h4>
              <p>{p.location}</p>
              <p>{p.price}</p>
              <p>{p.type}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
