import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    alert(`Searching for: ${searchQuery}`); // Replace with actual search logic
  };

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

      {/* Search Bar in the Middle */}
      <form className="search-bar" onSubmit={handleSearch}>
        <input 
          type="text" 
          placeholder="Find product to bid on..." 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)} 
        />
        <button type="submit">🔍</button>
      </form>

      <div className="auth-buttons">
        <Link to="/login" className="login-button">Login</Link>
      </div>
    </header>
  );
};

export default Header;
