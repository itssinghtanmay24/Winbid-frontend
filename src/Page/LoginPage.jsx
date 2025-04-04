import React, { useState } from "react";
import { Container, Typography, Button, TextField, Divider, Box, Alert } from "@mui/material";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

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
      // Make API call to login endpoint
      const response = await api.post('/auth/login', {
        email: formData.email,
        password: formData.password
      });

      const token = response.data.jwt;
      
      // Store the token
      localStorage.setItem('token', token);
      
      // Get user details
      const userResponse = await api.get('/auth/me');
      const userData = userResponse.data;
      
      // Call the login function from AuthContext
      login(userData, token);
      
      // Redirect to products page
      navigate('/products');
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Login failed. Please try again.');
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    alert("Google Login will be implemented later");
  };

  return (
    <Container maxWidth="xs" sx={{ 
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center", 
      justifyContent: "center", 
      height: "100vh",
      py: 4
    }}>
      <Box sx={{ 
        width: "100%", 
        textAlign: "center", 
        p: 4, 
        boxShadow: 3, 
        borderRadius: 2,
        backgroundColor: 'background.paper'
      }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
          Login to WinBid
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          Enter your details to access your account
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Button 
          variant="outlined" 
          startIcon={<FcGoogle />} 
          fullWidth 
          sx={{ 
            mt: 2, 
            mb: 2, 
            py: 1.5,
            backgroundColor: "background.paper",
            color: "text.primary",
            borderColor: 'divider',
            '&:hover': {
              backgroundColor: 'action.hover',
              borderColor: 'text.secondary'
            }
          }}
          onClick={handleGoogleLogin}
        >
          Continue with Google
        </Button>

        <Divider sx={{ my: 2, color: 'text.secondary' }}>or</Divider>

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
            sx={{ mb: 2 }}
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
            sx={{ mb: 2 }}
          />
          
          <Button 
            variant="contained" 
            color="primary" 
            fullWidth 
            size="large"
            sx={{ 
              mt: 2,
              py: 1.5,
              fontWeight: 'bold',
              fontSize: '1rem'
            }}
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>

        <Typography variant="body2" sx={{ mt: 3, textAlign: 'center' }}>
          Don't have an account?{' '}
          <Typography
            component="span"
            color="primary"
            sx={{ 
              cursor: "pointer",
              fontWeight: 'bold',
              '&:hover': {
                textDecoration: 'underline'
              }
            }}
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