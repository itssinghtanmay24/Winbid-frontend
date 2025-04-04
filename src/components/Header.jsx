import React from "react";
import { Link } from "react-router-dom";
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box,
  Avatar,
  IconButton
} from "@mui/material";

const Header = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "white", color: "black", boxShadow: "none" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography 
          variant="h4" 
          component={Link} 
          to="/" 
          sx={{ 
            textDecoration: "none", 
            color: "inherit",
            fontWeight: 'bold',
            letterSpacing: '1px'
          }}
        >
          WinBid
        </Typography>
        
        {/* Middle navigation links */}
        <Box display="flex" gap={4} sx={{ mx: 4 }}>
        <Button 
            component={Link}
            to="/"
            sx={{ 
              textTransform: 'none',
              color: 'inherit',
              fontSize: '1rem',
              '&:hover': {
                color: 'primary.main',
                backgroundColor: 'transparent'
              }
            }}
          >
            Home
          </Button>
          <Button 
            component={Link}
            to="/howitworks"
            sx={{ 
              textTransform: 'none',
              color: 'inherit',
              fontSize: '1rem',
              '&:hover': {
                color: 'primary.main',
                backgroundColor: 'transparent'
              }
            }}
          >
            How It Works
          </Button>
          <Button 
            component={Link}
            to="/contact"
            sx={{ 
              textTransform: 'none',
              color: 'inherit',
              fontSize: '1rem',
              '&:hover': {
                color: 'primary.main',
                backgroundColor: 'transparent'
              }
            }}
          >
            Contact
          </Button>
        </Box>
        
        {/* Right side login button */}
        <Box display="flex" alignItems="center" gap={2}>
          <IconButton sx={{ p: 0 }}>
            {/* <Avatar 
              sx={{ 
                width: 40, 
                height: 40,
                bgcolor: 'primary.main',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'scale(1.1)',
                transition: 'transform 0.3s ease'
                }
              }}
            /> */}
          </IconButton>
          <Button 
            variant="contained" 
            color="primary" 
            component={Link}
            to="/login"
            sx={{ 
              textTransform: 'none',
              fontSize: '1rem',
              px: 3,
              py: 1,
              borderRadius: '8px'
            }}
          >
            Login
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;