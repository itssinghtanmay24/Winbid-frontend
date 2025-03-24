import React, { useState } from "react";
import { Container, TextField, Button, Typography, MenuItem, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

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
    <Container maxWidth="sm" sx={{ mt: 5, textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        Create an Account
      </Typography>
      <Typography variant="body1" gutterBottom>
        Join WinBid and start bidding!
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} required fullWidth />
        <TextField label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} required fullWidth />
        <TextField label="Email" type="email" name="email" value={formData.email} onChange={handleChange} required fullWidth />
        <TextField label="Password" type="password" name="password" value={formData.password} onChange={handleChange} required fullWidth />
        <TextField select label="Role" name="role" value={formData.role} onChange={handleChange} fullWidth>
          <MenuItem value="USER">User</MenuItem>
          <MenuItem value="ADMIN">Admin</MenuItem>
        </TextField>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Register
        </Button>
      </Box>
      <Typography variant="body2" sx={{ mt: 2 }}>
        Already have an account?{' '}
        <Button onClick={() => navigate("/login")} sx={{ textTransform: "none" }}>
          Login
        </Button>
      </Typography>
    </Container>
  );
};

export default RegisterPage;