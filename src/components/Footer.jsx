import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Facebook, Twitter, Instagram, LinkedIn, Email } from "@mui/icons-material";

const FooterContainer = styled(AppBar)(({ theme }) => ({
  top: "auto",
  bottom: 0,
  backgroundColor: theme.palette.primary.dark,
  background: "linear-gradient(145deg, #1a1a1a, #2a2a2a)",
  padding: "20px 0",
  textAlign: "center",
  boxShadow: "0 -5px 20px rgba(0,0,0,0.2)",
  borderTop: "1px solid rgba(255,255,255,0.1)",
}));

const FooterLinks = styled(Box)({
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  gap: "15px",
  margin: "15px 0",
});

const SocialIcons = styled(Box)({
  display: "flex",
  justifyContent: "center",
  gap: "15px",
  margin: "15px 0",
});

const FooterButton = styled(Button)(({ theme }) => ({
  color: theme.palette.common.white,
  "&:hover": {
    color: theme.palette.secondary.main,
    transform: "translateY(-2px)",
  },
  transition: "all 0.3s ease",
}));

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer position="static">
      <Toolbar sx={{ flexDirection: "column", alignItems: "center" }}>
        <Typography 
          variant="h5" 
          sx={{ 
            mb: 2, 
            fontWeight: 700,
            background: "linear-gradient(90deg, #ff8a00, #e52e71)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Start Your Winning Journey!
        </Typography>
        
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/products"
          sx={{ 
            mt: 1,
            mb: 3,
            px: 4,
            py: 1,
            borderRadius: "25px",
            fontWeight: "bold",
            boxShadow: "0 4px 15px rgba(229, 46, 113, 0.4)",
            "&:hover": {
              transform: "translateY(-3px)",
              boxShadow: "0 6px 20px rgba(229, 46, 113, 0.6)",
            },
            transition: "all 0.3s ease",
          }}
        >
          Start Bidding Now
        </Button>
        
        <FooterLinks>
          <FooterButton component={Link} to="/howitworks">How It Works</FooterButton>
          <FooterButton component={Link} to="/contact">Contact Us</FooterButton>
          <FooterButton component={Link} to="/faq">FAQ</FooterButton>
          <FooterButton component={Link} to="/privacy">Privacy Policy</FooterButton>
          <FooterButton component={Link} to="/terms">Terms</FooterButton>
          <FooterButton 
            component="a" 
            href="https://tanmaysinghportfolio.netlify.app/" 
            target="_blank"
            rel="noopener noreferrer"
          >
            About Founder
          </FooterButton>
        </FooterLinks>
        
        <SocialIcons>
          <IconButton 
            aria-label="Facebook" 
            color="inherit"
            href="https://facebook.com" 
            target="_blank"
            sx={{
              "&:hover": { color: "#1877f2", transform: "scale(1.2)" },
              transition: "all 0.3s ease",
            }}
          >
            <Facebook />
          </IconButton>
          <IconButton 
            aria-label="Twitter" 
            color="inherit"
            href="https://twitter.com" 
            target="_blank"
            sx={{
              "&:hover": { color: "#1da1f2", transform: "scale(1.2)" },
              transition: "all 0.3s ease",
            }}
          >
            <Twitter />
          </IconButton>
          <IconButton 
            aria-label="Instagram" 
            color="inherit"
            href="https://instagram.com" 
            target="_blank"
            sx={{
              "&:hover": { 
                background: "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                transform: "scale(1.2)",
              },
              transition: "all 0.3s ease",
            }}
          >
            <Instagram />
          </IconButton>
          <IconButton 
            aria-label="LinkedIn" 
            color="inherit"
            href="https://linkedin.com" 
            target="_blank"
            sx={{
              "&:hover": { color: "#0a66c2", transform: "scale(1.2)" },
              transition: "all 0.3s ease",
            }}
          >
            <LinkedIn />
          </IconButton>
          <IconButton 
            aria-label="Email" 
            color="inherit"
            href="mailto:contact@winbid.com"
            sx={{
              "&:hover": { color: "#ea4335", transform: "scale(1.2)" },
              transition: "all 0.3s ease",
            }}
          >
            <Email />
          </IconButton>
        </SocialIcons>
        
        <Typography 
          variant="body2" 
          sx={{ 
            mt: 1, 
            color: "rgba(255,255,255,0.7)",
            fontFamily: "monospace",
          }}
        >
          © {currentYear} WinBid | All Rights Reserved
        </Typography>
      </Toolbar>
    </FooterContainer>
  );
};

export default Footer;