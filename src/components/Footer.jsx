import React from "react";
import { Link } from "react-router-dom"; // Import for navigation
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h2>Start Your Winning Journey!</h2>
        <Link to="/products">
          <button className="footer-button">Start Bidding</button>
        </Link>
      </div>
      <div className="footer-links">
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/faq">FAQ</Link>
        <Link to="/terms">Terms & Conditions</Link>
      </div>
      <p className="footer-copyright">© 2025 WinBid | All Rights Reserved</p>
    </footer>
  );
};

export default Footer;
