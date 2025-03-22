import React from "react";
import { FcGoogle } from "react-icons/fc"; // Google Icon
import { useNavigate } from "react-router-dom";
import "./LoginPage.css"; // Import CSS for additional styling if needed

const LoginPage = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    alert("Google Login Clicked! (Integrate OAuth here)");
    // TODO: Add Google OAuth integration
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Login to WinBid</h2>
        <p className="login-subtitle">Enter your details to access your account</p>

        {/* Google Login Button */}
        <button onClick={handleGoogleLogin} className="google-login-button">
          <FcGoogle className="google-icon" />
          <span>Login with Google</span>
        </button>

        {/* Divider */}
        <div className="divider">
          <hr className="line" />
          <span>or</span>
          <hr className="line" />
        </div>

        {/* Email & Password Login */}
        <input type="email" placeholder="Email" className="input-field" />
        <input type="password" placeholder="Password" className="input-field" />

        <button className="login-button">Login</button>

        <p className="signup-text">
          Don't have an account?{" "}
          <span className="signup-link" onClick={() => navigate("/register")}>
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
