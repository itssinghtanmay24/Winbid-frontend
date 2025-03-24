import React from "react";
import { Container, Typography, Button, TextField, Divider, Box } from "@mui/material";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    alert("Google Login Clicked! (Integrate OAuth here)");
    // TODO: Add Google OAuth integration
  };

  return (
    <Container maxWidth="xs" sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }}>
      <Box sx={{ width: "100%", textAlign: "center", p: 3, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom>Login to WinBid</Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>Enter your details to access your account</Typography>

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

        <TextField fullWidth label="Email" margin="normal" variant="outlined" />
        <TextField fullWidth label="Password" margin="normal" variant="outlined" type="password" />
        
        <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>Login</Button>

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
