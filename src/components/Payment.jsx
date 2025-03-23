import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import "./Payment.css"; // Import custom styles

const PaymentPage = () => {
  const [addOn, setAddOn] = useState(false);

  return (
    <div className="payment-container">
      <h1 className="title">Bid Receipt</h1>

      <div className="payment-content">
        {/* Left Section - Order Summary */}
        <div className="summary-section">
          <h2 className="price">$169.00</h2>
          <div className="product-card">
            <img src="https://via.placeholder.com/400x200.png?text=Pangea+Design+System" alt="Product" className="product-image" />
            <h3>Headphones</h3>
            <p>Noise-canceling headphones for immersive sound</p>
          </div>
          <div className="order-summary">
            <p><strong>Items Subtotal:</strong> $169.00</p>
            <p><strong>Tax:</strong> $1.00</p>
            <p className="order-total"><strong>Order Total:</strong> $170.00</p>
          </div>
          <div className="delivery-info">
            <span className="delivery-icon">⚡</span> Instant Delivery to Email/SMS
            <br /> Free Shipping 😊
          </div>
        </div>

        {/* Right Section - Payment Form */}
        <div className="form-section">
          <h2>Information</h2>
          <form>
            <label>Name *</label>
            <input type="text" placeholder="Full Name" required />
            
            <label>Email *</label>
            <input type="email" placeholder="hi@example.com" required />
            
            <label>Phone *</label>
            <input type="tel" placeholder="+1 (123) 456 - 7890" required />

            {/* Add-on Offer */}
            <div className={`addon-offer ${addOn ? "selected" : ""}`} onClick={() => setAddOn(!addOn)}>
              <div className="addon-header">
                <FaCheckCircle className={`check-icon ${addOn ? "active" : ""}`} />
                <span>Yes! I want to add <strong>$49.99</strong></span>
              </div>
              <p>One Time Offer: Want our advanced funnel training? Learn the 9 secret funnels.</p>
            </div>

            {/* Remember Information Checkbox */}
            <label className="checkbox-label">
              <input type="checkbox" /> Remember Information & Sign up for Texts
            </label>

            {/* Continue Button */}
            <button type="submit" className="continue-btn">Continue</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
