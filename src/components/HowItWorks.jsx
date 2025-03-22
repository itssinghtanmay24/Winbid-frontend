import React from "react";
import "./HowItWorks.css";

const HowItWorks = () => {
  return (
    <div className="how-it-works">
      <h1>How WinBid Works</h1>
      <section className="steps">
        <div className="step">
          <h2>1. Explore Available Products</h2>
          <p>Browse through our selection of exclusive products listed for bidding. Each product has a fixed, minimal bid price.</p>
        </div>

        <div className="step">
          <h2>2. Place Your Bid</h2>
          <p>Pay the single bid price for the product of your choice to participate in the bidding process.</p>
        </div>

        <div className="step">
          <h2>3. Bidding Completion</h2>
          <p>Once all bids for a product are completed, the bidding phase closes automatically.</p>
        </div>

        <div className="step">
          <h2>4. Random Winner Selection</h2>
          <p>Among all participants who placed a bid, one lucky winner is randomly selected to receive the product.</p>
        </div>

        <div className="step">
          <h2>5. Product Delivery</h2>
          <p>The selected winner will be notified, and the product will be shipped to them at no additional cost.</p>
        </div>

        <div className="step">
          <h2>6. Admin-Controlled Product Listings</h2>
          <p>All products on WinBid are genuine and added exclusively by our admin to ensure quality and authenticity.</p>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
