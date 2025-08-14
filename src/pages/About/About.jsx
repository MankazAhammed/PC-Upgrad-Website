import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-container">
      <section className="about-card">
        <h2 className="about-title">About This Project</h2>

        <p className="about-meta">
          <strong>Title:</strong> A Web-Based Interactive Guide for PC Hardware
          Upgrades with Real-Time Compatibility Checks
        </p>

        <p>
          This project was created as part of the Applied Research Methods
          course to address a common problem: the complexity and confusion users
          face when upgrading PC hardware.
        </p>

        <p>
          Using a modern tech stack (<strong>React.js</strong>,{" "}
          <strong>Express.js</strong>, <strong>MongoDB</strong>), this tool aims
          to simplify the upgrade process by helping users:
        </p>

        <ul className="about-list">
          <li>Understand which components are compatible</li>
          <li>
            Get real-time feedback <em>(future feature)</em>
          </li>
          <li>Receive upgrade suggestions within a budget</li>
        </ul>

        <p>
          The goal is to empower users of all technical levels with an
          intuitive, web-based solution that saves time, reduces mistakes, and
          builds confidence in their upgrade decisions.
        </p>

        <div className="about-author">
          <p>
            <strong>Author:</strong> Mankaz Ahammed Mandi
          </p>
          <p>
            <strong>Student No:</strong> 20047409
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
