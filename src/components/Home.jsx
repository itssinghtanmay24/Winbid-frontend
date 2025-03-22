import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <main className="home">
      <section className="lander">
        <h1>Welcome to WinBid!</h1>
        <p>Bid a small amount and stand a chance to win amazing products!</p>
        <button className="cta-button" onClick={() => navigate("/products")}>
          Start Bidding
        </button>
      </section>
    </main>
  );
};

export default Home;

