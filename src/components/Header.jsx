import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <h1>WinBid</h1>
      </div>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/how-it-works">How It Works</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>
      <div className="auth-buttons">
        <Link to="/login" className="login-button">Login</Link>
      </div>
    </header>
  );
};

export default Header;
