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
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import axios from 'axios';

const AddProductForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    imageUrl: '',
    totalBids: 0, 
    bidPrice: 0,
    userId: 1 // Default user ID for testing
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
      // Prepare the product data according to your backend's ProductRequest
      const productToCreate = {
        name: formData.name,
        description: formData.description,
        imageUrl: formData.imageUrl,
        totalBids: formData.totalBids || 0, // Ensure default value if empty
        bidPrice: formData.bidPrice,
        userId: formData.userId
      };

      // Make API call to your backend endpoint
      const response = await axios.post('http://localhost:8080/api/products', productToCreate);
      
      setSuccess(true);
      setTimeout(() => {
        navigate('/products');
      }, 1500); // Redirect after 1.5 seconds
      
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
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>Add New Product</Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Product created successfully! Redirecting...
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Product Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            error={!!error && !formData.name}
          />
          
          <TextField
            fullWidth
            margin="normal"
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            multiline
            rows={4}
          />
          
          <TextField
            fullWidth
            margin="normal"
            label="Image URL"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            type="url"
            placeholder="https://example.com/image.jpg"
          />

          <TextField
            fullWidth
            margin="normal"
            label="Total Bids"
            name="totalBids"
            value={formData.totalBids}
            onChange={handleChange}
            type="number"
            inputProps={{ min: 0 }}
          />
          
          <TextField
            fullWidth
            margin="normal"
            label="Bid Price"
            name="bidPrice"
            value={formData.bidPrice}
            onChange={handleChange}
            type="number"
            inputProps={{ min: 0, step: 0.01 }}
            required
            error={!!error && (formData.bidPrice <= 0)}
          />
          
          {/* Hidden user ID field for testing */}
          <input 
            type="hidden" 
            name="userId" 
            value={formData.userId} 
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating...' : 'Create Product'}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default AddProductForm;