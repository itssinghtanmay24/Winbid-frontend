import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Paper,
  Alert,
  FormControl,
  Grid,
  Avatar,
  InputAdornment,
  CircularProgress,
  useTheme,
  Divider
} from '@mui/material';
import {
  AddPhotoAlternate,
  Description,
  AttachMoney,
  Numbers,
  ShoppingBag
} from '@mui/icons-material';
import axios from 'axios';

const AddProductForm = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    imageUrl: '',
    totalBids: 0, 
    bidPrice: 0,
    userId: '67e8d1911c9eb13e31f27534'
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: ['bidPrice', 'totalBids'].includes(name) ? 
        (value === '' ? '' : parseFloat(value)) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setIsSubmitting(true);
    
    try {
      const productData = {
        name: formData.name,
        description: formData.description,
        imageUrl: formData.imageUrl,
        totalBids: formData.totalBids,
        bidPrice: formData.bidPrice,
        owner: formData.userId
      };

      const response = await axios.post('https://winbid-node-js.onrender.com/api/products', productData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      setSuccess(true);
      setTimeout(() => {
        navigate('/products');
      }, 1500);
      
    } catch (err) {
      const errorMessage = err.response?.data?.message || 
                         err.response?.data?.error || 
                         err.message || 
                         'Failed to create product';
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box sx={{ 
      maxWidth: 800, 
      mx: 'auto', 
      p: 3,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh'
    }}>
      <Paper elevation={6} sx={{ 
        p: 4, 
        width: '100%',
        borderRadius: 4,
        background: theme.palette.background.paper
      }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Avatar sx={{ 
            bgcolor: theme.palette.primary.main, 
            width: 60, 
            height: 60,
            mx: 'auto',
            mb: 2
          }}>
            <ShoppingBag fontSize="large" />
          </Avatar>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Add New Product
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Fill in the details to list your product for bidding
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}
        
        {success && (
          <Alert severity="success" sx={{ mb: 3 }}>
            Product created successfully! Redirecting...
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Product Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                error={!!error && !formData.name}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <ShoppingBag color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2
                  }
                }}
              />
              
              <TextField
                fullWidth
                margin="normal"
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                multiline
                rows={6}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Description color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2
                  }
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Image URL"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AddPhotoAlternate color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2
                  }
                }}
              />

              {formData.imageUrl && (
                <Box mt={2} sx={{ 
                  height: 200, 
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: theme.palette.grey[100],
                  borderRadius: 2,
                  overflow: 'hidden'
                }}>
                  <img 
                    src={formData.imageUrl} 
                    alt="Preview" 
                    style={{ 
                      maxWidth: '100%', 
                      maxHeight: '100%',
                      objectFit: 'contain'
                    }} 
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </Box>
              )}

              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Total Bids"
                    name="totalBids"
                    value={formData.totalBids}
                    onChange={handleChange}
                    type="number"
                    inputProps={{ min: 0 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Numbers color="action" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Bid Price"
                    name="bidPrice"
                    value={formData.bidPrice}
                    onChange={handleChange}
                    type="number"
                    inputProps={{ min: 0, step: 0.01 }}
                    required
                    error={!!error && (formData.bidPrice <= 0)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AttachMoney color="action" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2
                      }
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Divider sx={{ my: 4 }} />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            disabled={isSubmitting}
            sx={{
              py: 1.5,
              borderRadius: 2,
              fontWeight: 600,
              fontSize: '1rem',
              textTransform: 'none',
              boxShadow: 'none',
              '&:hover': {
                boxShadow: theme.shadows[4],
                transform: 'translateY(-2px)'
              }
            }}
            startIcon={isSubmitting ? 
              <CircularProgress size={20} color="inherit" /> : null}
          >
            {isSubmitting ? 'Creating Product...' : 'List Product for Bidding'}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default AddProductForm;