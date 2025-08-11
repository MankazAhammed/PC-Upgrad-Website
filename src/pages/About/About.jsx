import React from "react";

const About = () => {
  return (
    <div className="about">
      <h2>About This Project</h2>
      <p>
        <strong>Title:</strong> A Web-Based Interactive Guide for PC Hardware
        Upgrades with Real-Time Compatibility Checks
      </p>

      <p>
        This project was created as part of the Applied Research Methods course
        to address a common problem: the complexity and confusion users face
        when upgrading PC hardware.
      </p>

      <p>
        Using a modern tech stack (React.js, Express.js, MongoDB), this tool
        aims to simplify the upgrade process by helping users:
      </p>

      <ul>
        <li>Understand which components are compatible</li>
        <li>Get real-time feedback (future feature)</li>
        <li>Receive upgrade suggestions within a budget</li>
      </ul>

      <p>
        The goal is to empower users of all technical levels with an intuitive,
        web-based solution that saves time, reduces mistakes, and builds
        confidence in their upgrade decisions.
      </p>

      <p>
        <strong>Author:</strong> Mankaz Ahammed Mandi
        <br />
        <strong>Student No:</strong> 20047409
        <br />
        {/* <strong>Lecturer:</strong> Mina Ghahremanzamaneh */}
      </p>
    </div>
  );
};

export default About;
