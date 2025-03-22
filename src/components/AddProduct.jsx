import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddProduct.css";

const AddProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    imageUrl: "",
    bidPrice: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Product Data:", formData);
    alert("Product Added Successfully! (Integrate API here)");
    navigate("/products");
  };

  return (
    <div className="add-product-container">
      <div className="add-product-box">
        <h2 className="add-product-title">Add New Product</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            className="input-field"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Product Description"
            className="input-field"
            value={formData.description}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="imageUrl"
            placeholder="Image URL"
            className="input-field"
            value={formData.imageUrl}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="bidPrice"
            placeholder="Starting Bid Price"
            className="input-field"
            value={formData.bidPrice}
            onChange={handleChange}
            required
          />
          <button type="submit" className="add-button">
            Add Product
          </button>
        </form>
        <button className="cancel-button" onClick={() => navigate("/products")}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddProduct;
