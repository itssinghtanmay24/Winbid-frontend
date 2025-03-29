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
    imageFile: null,  // Changed from imageUrl to store File object
    totalBids: 0, 
    bidPrice: 0,
    userId: 1 // Default user ID for testing
  });
  const [previewUrl, setPreviewUrl] = useState(''); // For image preview
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, imageFile: file }));
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setIsSubmitting(true);
    
    try {
      // Create FormData object for file upload
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('totalBids', formData.totalBids);
      formDataToSend.append('bidPrice', formData.bidPrice);
      formDataToSend.append('userId', formData.userId);
      
      // Only append file if it exists
      if (formData.imageFile) {
        formDataToSend.append('imageFile', formData.imageFile);
      }

      // Make API call with FormData
      const response = await axios.post('http://localhost:8080/api/products', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
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
          
          {/* File upload input */}
          <FormControl fullWidth margin="normal">
            <Button
              variant="outlined"
              component="label"
              fullWidth
            >
              Upload Product Image
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleFileChange}
              />
            </Button>
            {previewUrl && (
              <Box mt={2} textAlign="center">
                <img 
                  src={previewUrl} 
                  alt="Preview" 
                  style={{ maxWidth: '100%', maxHeight: '200px' }} 
                />
              </Box>
            )}
            <Typography variant="caption" display="block" gutterBottom>
              {formData.imageFile ? formData.imageFile.name : 'No image selected'}
            </Typography>
          </FormControl>

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