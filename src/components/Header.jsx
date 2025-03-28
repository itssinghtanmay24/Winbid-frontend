import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  InputBase, 
  Button, 
  Box
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

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
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
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
            color="inherit" 
            component={Link} 
            to="/register"
            sx={{ whiteSpace: 'nowrap' }}
          >
            Register
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;