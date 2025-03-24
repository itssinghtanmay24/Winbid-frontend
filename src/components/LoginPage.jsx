import React, { useState } from "react";
import { Container, Typography, Button, TextField, Divider, Box, Alert } from "@mui/material";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("http://localhost:8080/auth/login", formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      console.log("Login response:", response); // Debug log
      
      // Check if the response contains the token in the expected format
      if (response.data && (response.data.jwt || response.data.token)) {
        const token = response.data.jwt || response.data.token;
        localStorage.setItem("authToken", token);
        
        // Store user data if available
        if (response.data.user) {
          localStorage.setItem("user", JSON.stringify(response.data.user));
        }
        
        // Redirect to frontend products page (not backend URL)
        navigate("/products");
      } else {
        throw new Error("Invalid response format - no token received");
      }
    } catch (err) {
      console.error("Login error:", err);
      
      let errorMessage = "Login failed";
      if (err.response) {
        // Server responded with error status
        errorMessage = err.response.data?.message || 
                      err.response.data?.error || 
                      err.response.statusText;
        
        // Handle specific JWT errors
        if (err.response.data?.includes("JWT")) {
          errorMessage = "Authentication error. Please try again.";
        }
      } else if (err.request) {
        // No response received
        errorMessage = "No response from server. Please try again later.";
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    alert("Google Login Clicked! (Integrate OAuth here)");
    // TODO: Add Google OAuth integration
  };

  return (
    <Container maxWidth="xs" sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }}>
      <Box sx={{ width: "100%", textAlign: "center", p: 3, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom>Login to WinBid</Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          Enter your details to access your account
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Button 
          variant="contained" 
          startIcon={<FcGoogle />} 
          fullWidth 
          sx={{ mt: 2, mb: 2, bgcolor: "white", color: "black", border: "1px solid #ccc" }}
          onClick={handleGoogleLogin}
        >
          Login with Google
        </Button>

        <Divider sx={{ my: 2 }}>or</Divider>

        <form onSubmit={handleSubmit}>
          <TextField 
            fullWidth 
            label="Email" 
            margin="normal" 
            variant="outlined" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            type="email"
          />
          <TextField 
            fullWidth 
            label="Password" 
            margin="normal" 
            variant="outlined" 
            type="password" 
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          
          <Button 
            variant="contained" 
            color="primary" 
            fullWidth 
            sx={{ mt: 2 }}
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>

        <Typography variant="body2" sx={{ mt: 2 }}>
          Don't have an account?{' '}
          <Typography
            component="span"
            color="primary"
            sx={{ cursor: "pointer" }}
            onClick={() => navigate("/register")}
          >
            Sign Up
          </Typography>
        </Typography>
      </Box>
    </Container>
  );
};

export default LoginPage;