import React, { useState, useEffect } from 'react';
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
import { useAuth } from '../services/AuthContext'; // Assuming you have an auth context

const AddProductForm = (adminRole) => {
  const navigate = useNavigate();
  const { user } = useAuth(); // Get the current user from auth context
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    imageUrl: '',
    bidPrice: '',
    totalBids: '1',
    admin: {
    id: 17
  }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [role,setRole]=useState("ADMIN");
  
    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const data = await productApi.getAllRoles();
          
          // Fetch completed bids and winner for each product
            console.log("dfghjk",data);
            
          setRole(data);
          console.log("fghjkl.",role);
          
          
          // setProducts(productsWithBidsAndWinner);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
    
      fetchProducts();
    }, [])

  useEffect(() => {
    console.log("I am into Add product")
    console.log(user?.role);
    console.log("dfgnhj",adminRole)
    // Verify user is admin before allowing access
    if (role !== 'ADMIN') {
      navigate('/products', { state: { error: 'Only admins can add products' } });
    }
    // console.log("I am into Add product")
  }, [user, navigate]);

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
      
      if (isNaN(bidPrice) )errors.push('Bid price must be a number');
      else if (bidPrice <= 0) errors.push('Bid price must be positive');
      
      if (isNaN(totalBids)) errors.push('Total bids must be a number');
      else if (totalBids <= 0) errors.push('Total bids must be positive');
      
      if (errors.length > 0) {
        throw new Error(errors.join('\n'));
      }
  
      const payload = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        imageUrl: formData.imageUrl.trim(),
        bidPrice: bidPrice,
        totalBids: totalBids,
        admin: { id: user.id } // Send the admin ID from the authenticated user
      };
  
      const response = await productApi.createProduct(payload);
      
      if (response.error) {
        throw new Error(response.error);
      }
      
      navigate('/products', { 
        state: { 
          success: 'Product created successfully!',
          newProduct: response.data
        } 
      });
    } catch (error) {
      console.error('Error creating product:', error);
      setError(error.message || 'Failed to create product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // if (!user || user.role !== 'ADMIN') {
  //   return (
  //     <Container maxWidth="sm" sx={{ py: 5 }}>
  //       <Typography variant="h6" color="error" textAlign="center">
  //         You don't have permission to access this page
  //       </Typography>
  //     </Container>
  //   );
  // }

  return (
    <Container maxWidth="sm" sx={{ py: 5 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom textAlign="center">
          Add New Product
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error.split('\n').map((line, i) => (
              <div key={i}>{line}</div>
            ))}
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
            label="Starting Bid Price (₹) *"
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
            label="Total Bids Allowed *"
            name="totalBids"
            type="number"
            value={formData.totalBids}
            onChange={handleChange}
            margin="normal"
            required
            inputProps={{ min: "1" }}
          />
          
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <Button 
              variant="contained" 
              color="primary" 
              type="submit"
              sx={{ mr: 2 }}
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : null}
              // onClick={productApi.createProduct(formData)}
              onClick={onSubmit}
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