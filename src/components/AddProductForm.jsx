import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  TextField, 
  Button, 
  Container, 
  Typography, 
  Box, 
  Paper,
  Alert,
  CircularProgress
} from '@mui/material';
import productApi from '../services/productApi';

const AddProductForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    imageUrl: '',
    bidPrice: '',
    totalBids: '', // Initialize as empty string
    admin: { id: 1 }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // Validate form data
      const errors = [];
      if (!formData.name.trim()) errors.push('Product name is required');
      
      const bidPrice = parseFloat(formData.bidPrice);
      const totalBids = parseInt(formData.totalBids);
      
      if (isNaN(bidPrice) || bidPrice <= 0) {
        errors.push('Bid price must be a positive number');
      }
      if (isNaN(totalBids) || totalBids <= 0) {
        errors.push('Total bids must be a positive integer');
      }
      
      if (errors.length > 0) {
        throw new Error(errors.join('\n'));
      }
  
      const payload = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        imageUrl: formData.imageUrl.trim(),
        bidPrice: bidPrice,
        totalBids: totalBids,
        admin: { id: formData.admin.id }
      };
  
      await productApi.createProduct(payload);
      // Optional: show success message before redirect
      navigate('/products', { state: { success: 'Product created successfully!' } });
    } catch (error) {
      console.error('Error creating product:', error);
      setError(error.message || 'Failed to create product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 5 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom textAlign="center">
          Add New Product
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            fullWidth
            label="Product Name *"
            name="name"
            value={formData.name}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            margin="normal"
            multiline
            rows={4}
          />
          <TextField
            fullWidth
            label="Image URL"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            margin="normal"
            placeholder="https://example.com/image.jpg"
          />
          <TextField
            fullWidth
            label="Bid Price (₹) *"
            name="bidPrice"
            type="number"
            value={formData.bidPrice}
            onChange={handleChange}
            margin="normal"
            required
            inputProps={{ min: "0.01", step: "0.01" }}
          />
          <TextField
            fullWidth
            label="Total Bids *"
            name="totalBids"
            type="number"
            value={formData.totalBids}
            onChange={handleChange}
            margin="normal"
            required
            inputProps={{ min: "1" }}
            placeholder="Enter total number of bids available"
          />
          
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <Button 
              variant="contained" 
              color="primary" 
              type="submit"
              sx={{ mr: 2 }}
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : null}
            >
              {loading ? 'Adding...' : 'Add Product'}
            </Button>
            <Button 
              variant="outlined" 
              onClick={() => navigate('/products')}
              disabled={loading}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default AddProductForm;