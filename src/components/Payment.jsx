import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Payment.css";

const Payment = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const productDetails = {
    1: { name: "Smartphone", price: 99 },
    2: { name: "Laptop", price: 49 },
    3: { name: "Headphones", price: 59 },
    4: { name: "Smartwatch", price: 79 },
  };

  const product = productDetails[productId];

  return (
    <div className="payment-page">
      <h2>Payment for {product?.name}</h2>
      <p>Total Amount: ₹{product?.price}</p>

      <div className="payment-options">
        <label>
          <input type="radio" name="payment" value="credit" /> Credit Card
        </label>
        <label>
          <input type="radio" name="payment" value="debit" /> Debit Card
        </label>
        <label>
          <input type="radio" name="payment" value="upi" /> UPI Payment
        </label>
      </div>

      <button className="pay-now-button" onClick={() => navigate("/success")}>
        Pay Now
      </button>
    </div>
  );
};

export default Payment;
