import React, { useEffect, useState } from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './CustomNavbar.css';

const CustomNavbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showMegaMenu, setShowMegaMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Navbar expand="lg" fixed="top" className={`py-3 ${scrolled ? 'scrolled' : ''}`}>
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <div
              className="nav-item-with-megamenu"
              onMouseEnter={() => !isMobile && setShowMegaMenu(true)}
              onMouseLeave={() => !isMobile && setShowMegaMenu(false)}
            >
              <Nav.Link
                as={Link}
                to="#"
                onClick={(e) => {
                  if (isMobile) {
                    e.preventDefault(); // prevent link redirect
                    setShowMegaMenu(prev => !prev);
                  }
                }}
              >
                Browse Properties
              </Nav.Link>

              {(showMegaMenu || !isMobile) && (
                <div className={`mega-menu ${isMobile ? 'mobile' : ''}`}>
                  <div className="mega-menu-column">
                    <h6>Featured Projects</h6>
                    <ul>
                      <li>Chelsea Residences</li>
                      <li>Safa Gate</li>
                      <li>Volta</li>
                      <li>Couture by Cavalli</li>
                      <li>Lagoon Views</li>
                      <li><strong>View All</strong></li>
                    </ul>
                  </div>
                  <div className="mega-menu-column">
                    <h6>Top Searches</h6>
                    <ul>
                      <li>Riverside Views</li>
                      <li>DAMAC Casa</li>
                      <li>Canal Heights 2</li>
                      <li>Ibiza</li>
                      <li>Golf Gate 2</li>
                    </ul>
                  </div>
                  <div className="mega-menu-column">
                    <h6>Locations</h6>
                    <ul>
                      <li>Dubai</li>
                      <li>Abu Dhabi</li>
                      <li>Ras Al Khaimah</li>
                    </ul>
                  </div>
                  <div className="mega-menu-column">
                    <h6>Communities</h6>
                    <ul>
                      <li>DAMAC Islands</li>
                      <li>DAMAC Riverside</li>
                      <li>DAMAC Sun City</li>
                      <li>DAMAC Lagoons</li>
                      <li>DAMAC Hills 2</li>
                      <li>DAMAC Hills</li>
                      <li><strong>View All</strong></li>
                    </ul>
                  </div>
                  <div className="mega-menu-column">
                    <h6>Offers and Deals</h6>
                    <ul>
                      <li>4% DLD Waiver</li>
                      <li>60/40 Payment Plan</li>
                      <li>Guaranteed Returns for 4 Years</li>
                      <li><strong>View All</strong></li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            <Nav.Link as={Link} to="/about">About Us</Nav.Link>
            <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
          </Nav>
          <Button variant="primary" className="ms-3">Enquire Now</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
