import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterPage.css"; // Import CSS for additional styling if needed

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    role: "USER",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Register Data:", formData);
    alert("Registration Successful! (Handle API call here)");
    navigate("/login");
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2 className="register-title">Create an Account</h2>
        <p className="register-subtitle">Join WinBid and start bidding!</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            className="input-field"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            className="input-field"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input-field"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="input-field"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <select name="role" className="input-field" value={formData.role} onChange={handleChange}>
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
          </select>

          <button type="submit" className="register-button">Register</button>
        </form>

        <p className="login-text">
          Already have an account?{" "}
          <span className="login-link" onClick={() => navigate("/login")}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
