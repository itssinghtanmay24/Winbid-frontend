import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const FooterContainer = styled(AppBar)({
  top: "auto",
  bottom: 0,
  backgroundColor: "#222",
  padding: "10px 0",
  textAlign: "center",
});

const FooterLinks = styled(Box)({
  display: "flex",
  justifyContent: "center",
  gap: "20px",
  marginTop: "10px",
});

const Footer = () => {
  return (
    <FooterContainer position="static">
      <Toolbar sx={{ flexDirection: "column", alignItems: "center" }}>
        <Typography variant="h6">Start Your Winning Journey!</Typography>
        
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/products"
          sx={{ mt: 1 }}
        >
          Start Bidding
        </Button>
        
        <FooterLinks>
          <Button color="inherit" component={Link} to="/about">About</Button>
          <Button color="inherit" component={Link} to="/contact">Contact</Button>
          <Button color="inherit" component={Link} to="/faq">FAQ</Button>
          <Button color="inherit" component={Link} to="/terms">Terms & Conditions</Button>
        </FooterLinks>
        
        <Typography variant="body2" sx={{ mt: 1, color: "#bbb" }}>
          © 2025 WinBid | All Rights Reserved
        </Typography>
      </Toolbar>
    </FooterContainer>
  );
};

export default Footer;