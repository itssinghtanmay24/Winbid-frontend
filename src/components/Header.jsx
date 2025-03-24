import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, InputBase, Button, Box } from "@mui/material";
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
}));

const SearchInput = styled(InputBase)({
  marginLeft: 8,
  flex: 1,
});

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    alert(`Searching for: ${searchQuery}`); // Replace with actual search logic
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#222" }}>
      <Toolbar>
        <Typography variant="h6" component={Link} to="/" sx={{ textDecoration: "none", color: "inherit" }}>
          WinBid
        </Typography>
        
        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/how-it-works">How It Works</Button>
          <Button color="inherit" component={Link} to="/contact">Contact</Button>
        </Box>

        <Search onSubmit={handleSearch}>
          <SearchIcon />
          <SearchInput
            placeholder="Find product to bid on..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Search>

        <Button color="inherit" component={Link} to="/login">Login</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;