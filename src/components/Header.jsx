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
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ShoppingCart, Menu as MenuIcon } from "@mui/icons-material";
import { AuthContext } from "./AuthContext";
import { WishlistContext } from "./WishlistContext";
import Cart from "./Cart";

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { user, isAuthenticated, logout, loading: authLoading } = useContext(AuthContext);
  const { likedCount } = useContext(WishlistContext);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
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

  const handleDrawerToggle = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  const handleDrawerClose = () => {
    setMobileDrawerOpen(false);
  };

  const navigationItems = [
    { label: "Home", path: "/" },
    { label: "How It Works", path: "/howitworks" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <>
      <AppBar
        position="static"
        sx={{ backgroundColor: "white", color: "black", boxShadow: "none" }}
      >
        <Toolbar sx={{ justifyContent: "space-between", px: { xs: 1, sm: 2, md: 3 } }}>
          {/* Left side - Logo and Mobile Menu */}
          <Box display="flex" alignItems="center" gap={1}>
            {isMobile && (
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleDrawerToggle}
                sx={{ mr: 1 }}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Typography
              variant={isMobile ? "h5" : "h4"}
              component={Link}
              to="/"
              sx={{
                textDecoration: "none",
                color: "inherit",
                fontWeight: "bold",
                letterSpacing: "1px",
                fontSize: { xs: "1.25rem", sm: "1.5rem", md: "2rem" },
              }}
            >
              WinBid
            </Typography>
          </Box>

          {/* Middle navigation links - Desktop only */}
          {!isMobile && (
            <Box display="flex" gap={4} sx={{ mx: 4 }}>
              {navigationItems.map((item) => (
                <Button
                  key={item.path}
                  component={Link}
                  to={item.path}
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
                  {item.label}
                </Button>
              ))}
            </Box>
          )}

          {/* Right side auth section */}
          <Box display="flex" alignItems="center" gap={{ xs: 0.5, sm: 1, md: 2 }}>
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
                    fontSize: { xs: "0.75rem", sm: "0.875rem" },
                    px: { xs: 1, sm: 2 },
                    py: { xs: 0.5, sm: 0.75 },
                    borderRadius: "8px",
                    display: { xs: "none", sm: "inline-flex" },
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
                    width: { xs: 32, sm: 40 },
                    height: { xs: 32, sm: 40 },
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
                fontSize: { xs: "0.875rem", sm: "1rem" },
                px: { xs: 2, sm: 3 },
                py: { xs: 0.75, sm: 1 },
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

    {/* Mobile Drawer */}
    <Drawer
      anchor="left"
      open={mobileDrawerOpen}
      onClose={handleDrawerClose}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      sx={{
        display: { xs: "block", md: "none" },
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: 280,
        },
      }}
    >
      <Box sx={{ width: 280, pt: 2 }}>
        <List>
          {navigationItems.map((item) => (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                component={Link}
                to={item.path}
                onClick={handleDrawerClose}
                sx={{
                  py: 1.5,
                  px: 3,
                  "&:hover": {
                    backgroundColor: "action.hover",
                  },
                }}
              >
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
          {isAuthenticated && isAdmin && (
            <>
              <Divider sx={{ my: 1 }} />
              <ListItem disablePadding>
                <ListItemButton
                  component={Link}
                  to="/addProduct"
                  onClick={handleDrawerClose}
                  sx={{
                    py: 1.5,
                    px: 3,
                    "&:hover": {
                      backgroundColor: "action.hover",
                    },
                  }}
                >
                  <ListItemText primary="Add Product" />
                </ListItemButton>
              </ListItem>
            </>
          )}
        </List>
      </Box>
    </Drawer>
    </>
  );
};

export default Header;
