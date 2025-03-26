import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AppBar, Toolbar, Typography, InputBase, Button, Box, Avatar, Menu, MenuItem, IconButton } from "@mui/material";
import { Search as SearchIcon, AccountCircle } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import axios from "axios";

const Search = styled("form")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  backgroundColor: "#f1f1f1",
  borderRadius: theme.shape.borderRadius,
  padding: "4px 10px",
  marginLeft: "auto",
  marginRight: "auto",
  width: "40%",
  [theme.breakpoints.down('sm')]: {
    width: "100%",
    margin: "10px 0"
  }
}));

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userData = JSON.parse(localStorage.getItem('user'));
    
    if (token) {
      setIsLoggedIn(true);
      if (userData) setUser(userData);
      
      // Optional: Verify token validity with backend
      verifyToken(token);
    }
  }, [location]); // Re-run when route changes

  const verifyToken = async (token) => {
    try {
      await axios.get('http://localhost:8080/auth/validate', {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (error) {
      handleLogout();
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8080/auth/logout', {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      setIsLoggedIn(false);
      setUser(null);
      navigate('/');
    }
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#222" }}>
      <Toolbar sx={{ flexWrap: 'wrap' }}>
        <Typography 
          variant="h6" 
          component={Link} 
          to="/" 
          sx={{ 
            textDecoration: "none", 
            color: "inherit",
            mr: 2,
            fontWeight: 'bold'
          }}
        >
          WinBid
        </Typography>
        
        <Box sx={{ 
          flexGrow: 1, 
          display: "flex", 
          justifyContent: "center",
          flexWrap: 'wrap'
        }}>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/products">Products</Button>
          <Button color="inherit" component={Link} to="/how-it-works">How It Works</Button>
        </Box>

        <Search onSubmit={handleSearch}>
          <SearchIcon />
          <InputBase
            placeholder="Find products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ ml: 1, flex: 1 }}
          />
        </Search>

        {isLoggedIn ? (
          <>
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleProfileMenuOpen}
              sx={{ ml: 2 }}
            >
              {user?.avatar ? (
                <Avatar src={user.avatar} alt={user.name} sx={{ width: 32, height: 32 }} />
              ) : (
                <AccountCircle />
              )}
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={() => { handleMenuClose(); navigate('/profile'); }}>
                My Profile
              </MenuItem>
              {/* <MenuItem onClick={() => { handleMenuClose(); navigate('/my-bids'); }}>
                My Bids
              </MenuItem> */}
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </>
        ) : (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button 
              color="inherit" 
              component={Link} 
              to="/login"
              sx={{ whiteSpace: 'nowrap' }}
            >
              Login
            </Button>
            <Button 
              // variant="outlined" 
              color="inherit" 
              component={Link} 
              to="/register"
              sx={{ whiteSpace: 'nowrap' }}
            >
              Register
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;