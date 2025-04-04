import React, { useState } from "react";
import { Container, TextField, Button, Typography, MenuItem, Box, Alert, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    role: "USER",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.post("http://localhost:8080/auth/register", formData);
      
      if (response.status === 201) {
        setSuccess(true);
        // Optionally auto-redirect after a delay
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (err) {
      if (err.response) {
        // The request was made and the server responded with a status code
        setError(err.response.data || "Registration failed");
      } else if (err.request) {
        // The request was made but no response was received
        setError("No response from server. Please try again later.");
      } else {
        // Something happened in setting up the request
        setError("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 20, textAlign: "center", }}>
      <Grid>

      <Typography variant="h4" gutterBottom>
        Create an Account
      </Typography>
      <Typography variant="body1" gutterBottom>
        Join WinBid and start bidding!
      </Typography>
      
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          User registered successfully! Redirecting to login...
        </Alert>
      )}
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField 
          label="First Name" 
          name="firstName" 
          value={formData.firstName} 
          onChange={handleChange} 
          required 
          fullWidth 
        />
        <TextField 
          label="Last Name" 
          name="lastName" 
          value={formData.lastName} 
          onChange={handleChange} 
          required 
          fullWidth 
        />
        <TextField 
          label="Email" 
          type="email" 
          name="email" 
          value={formData.email} 
          onChange={handleChange} 
          required 
          fullWidth 
        />
        <TextField 
          label="Password" 
          type="password" 
          name="password" 
          value={formData.password} 
          onChange={handleChange} 
          required 
          fullWidth 
        />
        <TextField 
          select 
          label="Role" 
          name="role" 
          value={formData.role} 
          onChange={handleChange} 
          fullWidth
        >
          <MenuItem value="USER">User</MenuItem>
          <MenuItem value="ADMIN">Admin</MenuItem>
        </TextField>
        <Button 
          type="submit" 
          variant="contained" 
          color="primary" 
          fullWidth
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </Button>
      </Box>
      <Typography variant="body2" sx={{ mt: 2 }}>
        Already have an account?{' '}
        <Button onClick={() => navigate("/login")} sx={{ textTransform: "none" }}>
          Login
        </Button>
      </Typography>
      </Grid>
    </Container>
  );
};

export default RegisterPage;