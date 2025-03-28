import React, { useState } from "react";
import { Container, Typography, Button, TextField, Divider, Box, Alert } from "@mui/material";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

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
    
    // Mock login - just navigate without actual authentication
    setTimeout(() => {
      setLoading(false);
      navigate("/products");
    }, 1000);
  };

  const handleGoogleLogin = () => {
    alert("Google Login will be implemented later");
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