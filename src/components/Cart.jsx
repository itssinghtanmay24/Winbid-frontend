import React, { useState, useContext } from 'react';
import {
  Drawer,
  Box,
  Typography,
  Tabs,
  Tab,
  IconButton,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  Badge,
  Divider,
  Paper,
  Chip,
} from '@mui/material';
import {
  Close,
  ShoppingCart,
  Favorite,
  Gavel,
  Delete,
} from '@mui/icons-material';

// Rupee Icon Component
const RupeeIcon = ({ fontSize = 'inherit', ...props }) => (
  <Typography
    component="span"
    sx={{
      fontSize: fontSize === 'small' ? '0.875rem' : fontSize === 'large' ? '1.25rem' : 'inherit',
      fontWeight: 600,
      lineHeight: 1,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
    {...props}
  >
    ₹
  </Typography>
);
import { useNavigate } from 'react-router-dom';
import { WishlistContext } from './WishlistContext';

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`cart-tabpanel-${index}`}
      aria-labelledby={`cart-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

const Cart = ({ open, onClose }) => {
  const navigate = useNavigate();
  const { likedItems, biddedItems, removeFromLiked, isLiked } = useContext(WishlistContext);
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleProductClick = (product) => {
    navigate(`/products/${product._id || product.id}`, { state: { product } });
    onClose();
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: '100%', sm: 500 },
          p: 2,
        },
      }}
    >
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1 }}>
            <ShoppingCart /> My Cart
          </Typography>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>

        <Divider sx={{ mb: 2 }} />

        {/* Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="cart tabs">
            <Tab
              icon={<Favorite />}
              iconPosition="start"
              label={
                <Badge badgeContent={likedItems.length} color="error">
                  Liked Items
                </Badge>
              }
              sx={{ textTransform: 'none', minWidth: 150 }}
            />
            <Tab
              icon={<Gavel />}
              iconPosition="start"
              label={
                <Badge badgeContent={biddedItems.length} color="primary">
                  Bidded Items
                </Badge>
              }
              sx={{ textTransform: 'none', minWidth: 150 }}
            />
          </Tabs>
        </Box>

        {/* Tab Panels */}
        <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
          {/* Liked Items Tab */}
          <TabPanel value={tabValue} index={0}>
            {likedItems.length === 0 ? (
              <Paper
                sx={{
                  p: 4,
                  textAlign: 'center',
                  backgroundColor: 'grey.50',
                }}
              >
                <Favorite sx={{ fontSize: 64, color: 'grey.400', mb: 2 }} />
                <Typography variant="h6" color="text.secondary">
                  No liked items yet
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Start liking products to see them here!
                </Typography>
              </Paper>
            ) : (
              <Grid container spacing={2}>
                {likedItems.map((product) => (
                  <Grid item xs={12} key={product._id || product.id}>
                    <Card
                      sx={{
                        display: 'flex',
                        cursor: 'pointer',
                        '&:hover': {
                          boxShadow: 4,
                        },
                      }}
                      onClick={() => handleProductClick(product)}
                    >
                      <CardMedia
                        component="img"
                        sx={{ width: 120, height: 120, objectFit: 'cover' }}
                        image={product.imageUrl || 'https://via.placeholder.com/120?text=No+Image'}
                        alt={product.name}
                      />
                      <CardContent sx={{ flex: 1, position: 'relative', p: 2 }}>
                        <Typography variant="h6" sx={{ fontSize: '1rem', mb: 0.5 }}>
                          {product.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            mb: 1,
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                          }}
                        >
                          {product.description}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <Chip
                            icon={<RupeeIcon fontSize="small" />}
                            label={`₹${product.bidPrice || 0}`}
                            size="small"
                            color="primary"
                          />
                          <Chip
                            label={`${product.currentBidCount || 0}/${product.totalBids || 0} Bids`}
                            size="small"
                            variant="outlined"
                          />
                        </Box>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Button
                            variant="contained"
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleProductClick(product);
                            }}
                            sx={{ textTransform: 'none' }}
                          >
                            View Details
                          </Button>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeFromLiked(product._id || product.id);
                            }}
                          >
                            <Delete fontSize="small" />
                          </IconButton>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </TabPanel>

          {/* Bidded Items Tab */}
          <TabPanel value={tabValue} index={1}>
            {biddedItems.length === 0 ? (
              <Paper
                sx={{
                  p: 4,
                  textAlign: 'center',
                  backgroundColor: 'grey.50',
                }}
              >
                <Gavel sx={{ fontSize: 64, color: 'grey.400', mb: 2 }} />
                <Typography variant="h6" color="text.secondary">
                  No bids yet
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Start bidding on products to see them here!
                </Typography>
              </Paper>
            ) : (
              <Grid container spacing={2}>
                {biddedItems.map((product) => (
                  <Grid item xs={12} key={product._id || product.id}>
                    <Card
                      sx={{
                        display: 'flex',
                        cursor: 'pointer',
                        '&:hover': {
                          boxShadow: 4,
                        },
                      }}
                      onClick={() => handleProductClick(product)}
                    >
                      <CardMedia
                        component="img"
                        sx={{ width: 120, height: 120, objectFit: 'cover' }}
                        image={product.imageUrl || 'https://via.placeholder.com/120?text=No+Image'}
                        alt={product.name}
                      />
                      <CardContent sx={{ flex: 1, position: 'relative', p: 2 }}>
                        <Typography variant="h6" sx={{ fontSize: '1rem', mb: 0.5 }}>
                          {product.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            mb: 1,
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                          }}
                        >
                          {product.description}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <Chip
                            icon={<RupeeIcon fontSize="small" />}
                            label={`₹${product.bidPrice || 0}`}
                            size="small"
                            color="primary"
                          />
                          <Chip
                            label={`${product.currentBidCount || 0}/${product.totalBids || 0} Bids`}
                            size="small"
                            variant="outlined"
                          />
                          <Chip
                            label="Bidded"
                            size="small"
                            color="success"
                          />
                        </Box>
                        <Button
                          variant="contained"
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleProductClick(product);
                          }}
                          sx={{ textTransform: 'none' }}
                        >
                          View Details
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </TabPanel>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Cart;

