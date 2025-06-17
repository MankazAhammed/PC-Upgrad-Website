import React, { useEffect, useState } from "react";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import GetInTouchModal from "../GetInTouchModal/GetInTouchModal";
import LElogo from "../../assets/LELogo.png";
import "./Navbar.css";

const CustomNavbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Navbar
        expand="lg"
        fixed="top"
        className={`py-3 ${scrolled ? "scrolled" : ""}`}
      >
        <Container>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/">
                <img src={LElogo} alt="Lords Logo" height="40" />
              </Nav.Link>
              <Nav.Link as={Link} to="/browse-properties">
                Browse Properties
              </Nav.Link>
              <Nav.Link as={Link} to="/about">
                About Us
              </Nav.Link>
            </Nav>
            <Button
              variant="primary"
              className="ms-3"
              onClick={() => setShowModal(true)}
            >
              Get In Touch
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <GetInTouchModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
};

export default CustomNavbar;