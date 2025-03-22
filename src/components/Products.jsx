import React from "react";
import "./Products.css";

const Products = () => {
  const products = [
    {
      id: 1,
      name: "Smartphone",
      description: "Latest model with advanced features.",
      imageUrl: "https://via.placeholder.com/150",
      bidPrice: 99,
    },
    {
      id: 2,
      name: "Laptop",
      description: "Powerful laptop for work and gaming.",
      imageUrl: "https://via.placeholder.com/150",
      bidPrice: 49,
    },
    {
      id: 3,
      name: "Headphones",
      description: "Noise-canceling headphones for immersive sound.",
      imageUrl: "https://via.placeholder.com/150",
      bidPrice: 59,
    },
    {
      id: 4,
      name: "Smartwatch",
      description: "Track fitness and stay connected on the go.",
      imageUrl: "https://via.placeholder.com/150",
      bidPrice: 79,
    },
  ];

  return (
    <div className="products-page">
      <h2>Available Products</h2>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.imageUrl} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>
              <strong>Bid Price:</strong>{" "}
              {new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
              }).format(product.bidPrice)}
            </p>
            <button className="bid-button">Place Bid</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;

