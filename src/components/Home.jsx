import React from "react";
import "./Home.css"; // Import CSS file
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <h1>WinBid - Try Your Luck & Win Big!</h1>
        <p>Bid Small, Win Big! One lucky bidder gets the prize.</p>
        <Link to="/products">
          <button className="hero-button">Start Bidding</button>
        </Link>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps-container">
          {[
            { title: "Choose a Product", description: "Select from a variety of premium products." },
            { title: "Place a Small Bid", description: "Pay a minimal entry fee to participate." },
            { title: "Get Lucky & Win", description: "One random lucky bidder wins the product!" }
          ].map((step, index) => (
            <div key={index} className="step-card">
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Bids */}
      <section className="featured-bids">
        <h2>Featured Bids</h2>
        <div className="featured-container">
          {[
            { title: "Smartphone Giveaway", price: "$1" },
            { title: "Luxury Watch", price: "$2" },
            { title: "Gaming Console", price: "$3" }
          ].map((item, index) => (
            <div key={index} className="featured-item">
              <h3>{item.title}</h3>
              <p>Starting at just {item.price}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;