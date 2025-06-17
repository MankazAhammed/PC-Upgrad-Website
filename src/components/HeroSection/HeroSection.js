import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./HeroSection.css";
import heroVideo from "../../assets/hero-video.mp4";

const HeroSection = () => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (name) => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  const scrollToNext = () => {
    window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
  };

  return (
    <div className="hero-container">
      {/* Section 1 */}
      <section className="hero-section">
        <div className="hero-video-container">
          <video autoPlay loop muted playsInline className="hero-video">
            <source src={heroVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="hero-overlay">
          <div className="hero-content-wrapper">
            <h1>Discover Premium Living with LORDS</h1>
            <p className="lead">
              Experience luxury redefined in our exquisite properties across
              prime locations
            </p>
            <div className="hero-button">
              <Button variant="primary" className="me-3">
                Explore
              </Button>
              <Button variant="outline-light">Contact Us</Button>
            </div>
          </div>
          <div className="scroll-indicator" onClick={scrollToNext}>↓</div>
        </div>
      </section>

      {/* Section 2 */}
      <section className="hero-section">
        <div className="hero-video-container">
          <video autoPlay loop muted playsInline className="hero-video">
            <source src={heroVideo} type="video/mp4" />
          </video>
        </div>
        <div className="hero-overlay">
          <Container>
            <Row className="justify-content-center">
              <Col lg={10}>
                <div className="filter-container">
                  <div className="filter-box">
                    <form className="filter-form">
                      <div
                        className="filter-row clickable"
                        onClick={() => toggleDropdown("location")}
                      >
                        <span className="filter-label">
                          Search by City, Community or Project
                        </span>
                        <span className="filter-value">All locations</span>
                        {openDropdown === "location" && (
                          <div className="custom-dropdown">
                            <div className="dropdown-header">TRENDING NOW</div>
                            <ul>
                              <li>📍 ELO 3 (DAMAC Hills 2)</li>
                              <li>📍 Lagoon Views (DAMAC Lagoons)</li>
                              <li>📍 Safa Gate (Sheikh Zayed Road)</li>
                              <li>📍 VOLTA (Sheikh Zayed Road)</li>
                            </ul>
                          </div>
                        )}
                      </div>

                      <div
                        className="filter-row clickable"
                        onClick={() => toggleDropdown("type")}
                      >
                        <span className="filter-label">Property Type</span>
                        <span className="filter-value">Any</span>
                      </div>

                      <div
                        className="filter-row clickable"
                        onClick={() => toggleDropdown("bedrooms")}
                      >
                        <span className="filter-label">Bedrooms</span>
                        <span className="filter-value">Any</span>
                      </div>

                      <div
                        className="filter-row clickable"
                        onClick={() => toggleDropdown("price")}
                      >
                        <span className="filter-label">Price</span>
                        <span className="filter-value">Any</span>
                      </div>

                      <div className="filter-actions">
                        <Button variant="primary" className="show-results-btn">
                          SHOW ALL RESULTS
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
          <div className="scroll-indicator" onClick={scrollToNext}>↓</div>
        </div>
      </section>

      {/* Section 3 */}
      <section className="hero-section">
        <div className="hero-video-container">
          <video autoPlay loop muted playsInline className="hero-video">
            <source src={heroVideo} type="video/mp4" />
          </video>
        </div>
        <div className="hero-overlay">
          <div className="hero-button-bar">
            <Button variant="primary" className="me-3">
              Explore
            </Button>
            <Button variant="outline-light">Contact Us</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
