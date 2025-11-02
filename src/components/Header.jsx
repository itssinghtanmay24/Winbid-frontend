import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  Badge,
} from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import { AuthContext } from "./AuthContext";
import { WishlistContext } from "./WishlistContext";
import Cart from "./Cart";

const Header = () => {
  const { user, isAuthenticated, logout, loading: authLoading } = useContext(AuthContext);
  const { likedCount } = useContext(WishlistContext);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const open = Boolean(anchorEl);

  // Check if user role is admin (case-insensitive and trimmed) - same logic as ProductCard
  const userRole = user?.role ? String(user.role).toLowerCase().trim() : '';
  const isAdmin = !authLoading && user && userRole === "admin";
  
  // Debug: Log user data to help troubleshoot
  React.useEffect(() => {
    if (isAuthenticated && user) {
      console.log("Header - User data:", user);
      console.log("Header - User role:", user.role);
      console.log("Header - Is admin:", isAdmin);
    }
  }, [user, isAuthenticated, isAdmin]);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
    navigate("/login");
  };

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "white", color: "black", boxShadow: "none" }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography
          variant="h4"
          component={Link}
          to="/"
          sx={{
            textDecoration: "none",
            color: "inherit",
            fontWeight: "bold",
            letterSpacing: "1px",
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
              textTransform: "none",
              color: "inherit",
              fontSize: "1rem",
              "&:hover": {
                color: "primary.main",
                backgroundColor: "transparent",
              },
            }}
          >
            Home
          </Button>
          <Button
            component={Link}
            to="/howitworks"
            sx={{
              textTransform: "none",
              color: "inherit",
              fontSize: "1rem",
              "&:hover": {
                color: "primary.main",
                backgroundColor: "transparent",
              },
            }}
          >
            How It Works
          </Button>
          <Button
            component={Link}
            to="/contact"
            sx={{
              textTransform: "none",
              color: "inherit",
              fontSize: "1rem",
              "&:hover": {
                color: "primary.main",
                backgroundColor: "transparent",
              },
            }}
          >
            Contact
          </Button>
        </Box>

        {/* Right side auth section */}
        <Box display="flex" alignItems="center" gap={2}>
          {isAuthenticated ? (
            <>
              {isAdmin && (
                <Button
                  component={Link}
                  to="/addProduct"
                  variant="contained"
                  color="primary"
                  sx={{
                    textTransform: "none",
                    fontSize: "0.875rem",
                    px: 2,
                    py: 0.75,
                    borderRadius: "8px",
                  }}
                >
                  Add Product
                </Button>
              )}
              <IconButton
                onClick={() => setCartOpen(true)}
                sx={{
                  color: "inherit",
                  "&:hover": {
                    backgroundColor: "action.hover",
                  },
                }}
              >
                <Badge badgeContent={likedCount} color="error">
                  <ShoppingCart />
                </Badge>
              </IconButton>
              <IconButton
                onClick={handleMenuOpen}
                sx={{ p: 0 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <Avatar
                  sx={{
                    width: 40,
                    height: 40,
                    bgcolor: "primary.main",
                    cursor: "pointer",
                    "&:hover": {
                      transform: "scale(1.1)",
                      transition: "transform 0.3s ease",
                    },
                  }}
                  src={user?.avatar}
                >
                  {user?.name?.charAt(0)}
                </Avatar>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleMenuClose}
                onClick={handleMenuClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem onClick={() => navigate(`/profile/${user.id}`)}>
                  <Avatar /> Profile
                </MenuItem>
                {/* <MenuItem onClick={() => navigate("/settings")}>
                  <Avatar /> Settings
                </MenuItem> */}
                <Divider />
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/login"
              sx={{
                textTransform: "none",
                fontSize: "1rem",
                px: 3,
                py: 1,
                borderRadius: "8px",
              }}
            >
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
      {isAuthenticated && (
        <Cart open={cartOpen} onClose={() => setCartOpen(false)} />
      )}
    </AppBar>
  );
};

export default Header;
