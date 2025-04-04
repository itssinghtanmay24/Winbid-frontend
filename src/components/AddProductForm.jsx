import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Paper,
  Alert,
  FormControl
} from '@mui/material';
import axios from 'axios';

const AddProductForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    imageUrl: '', // Changed from imageFile to imageUrl
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
      // Now sending as JSON with imageUrl instead of FormData
      const productData = {
        name: formData.name,
        description: formData.description,
        imageUrl: formData.imageUrl,
        totalBids: formData.totalBids,
        bidPrice: formData.bidPrice,
        owner: formData.userId
      };

      const response = await axios.post('http://localhost:8080/api/products', productData, {
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
            placeholder="https://example.com/image.jpg"
          />

          {formData.imageUrl && (
            <Box mt={2} textAlign="center">
              <img 
                src={formData.imageUrl} 
                alt="Preview" 
                style={{ maxWidth: '100%', maxHeight: '200px' }} 
                onError={(e) => {
                  e.target.style.display = 'none'; // Hide if image fails to load
                }}
              />
            </Box>
          )}

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