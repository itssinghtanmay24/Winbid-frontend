import React from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import "./Products.css"; // Import custom CSS

const Products = () => {
  const navigate = useNavigate();

  const products = [
    { id: 1, name: "Smartphone", description: "Latest model with advanced features.", imageUrl: "https://via.placeholder.com/150", bidPrice: 99, totalBids: 100, completedBids: 75 },
    { id: 2, name: "Laptop", description: "Powerful laptop for work and gaming.", imageUrl: "https://via.placeholder.com/150", bidPrice: 49, totalBids: 80, completedBids: 40 },
    { id: 3, name: "Headphones", description: "Noise-canceling headphones for immersive sound.", imageUrl: "https://via.placeholder.com/150", bidPrice: 59, totalBids: 120, completedBids: 90 },
    { id: 4, name: "Smartwatch", description: "Track fitness and stay connected on the go.", imageUrl: "https://via.placeholder.com/150", bidPrice: 79, totalBids: 50, completedBids: 20 },
  ];

  return (
    <div className="products-page">
      <h2>Available Products</h2>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-image" style={{ backgroundImage: `url(${product.imageUrl})` }}></div>
            <div className="product-details">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>
                <strong>Bid Price:</strong> ₹{product.bidPrice}
              </p>
              <div className="progress-bar-container">
                <div
                  className="progress-bar"
                  style={{ width: `${(product.completedBids / product.totalBids) * 100}%` }}
                ></div>
              </div>
              <p className="bid-info">
                {product.completedBids} / {product.totalBids} Bids Completed
              </p>
              <button className="bid-button" onClick={() => navigate(`/payment`)}>
                Place Bid
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Floating "+" Button */}
      <button className="add-product-button" onClick={() => navigate("/add-product")}>
        <FaPlus size={24} />
      </button>
    </div>
  );
};

export default Products;
