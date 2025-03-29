import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box,
  Avatar,
  IconButton
} from "@mui/material";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

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
        
        {user ? (
          <Box display="flex" alignItems="center" gap={2}>
            <IconButton onClick={handleProfileClick} sx={{ p: 0 }}>
              <Avatar 
                alt={user.firstName} 
                src={user.avatar}
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
              >
                {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
              </Avatar>
            </IconButton>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleLogout}
              sx={{ 
                textTransform: 'none',
                fontSize: '1rem',
                px: 3,
                py: 1,
                borderRadius: '8px'
              }}
            >
              Logout
            </Button>
          </Box>
        ) : (
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
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;