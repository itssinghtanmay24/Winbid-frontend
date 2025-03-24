import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Card, CardContent, Typography, Box } from "@mui/material";

const AddProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    imageUrl: "",
    bidPrice: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Product Data:", formData);
    alert("Product Added Successfully! (Integrate API here)");
    navigate("/products");
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Card sx={{ maxWidth: 400, padding: 3, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Add New Product
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Product Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Product Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              margin="normal"
              multiline
              rows={3}
              required
            />
            <TextField
              fullWidth
              label="Image URL"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Starting Bid Price"
              name="bidPrice"
              type="number"
              value={formData.bidPrice}
              onChange={handleChange}
              margin="normal"
              required
            />
            <Box display="flex" justifyContent="space-between" mt={2}>
              <Button type="submit" variant="contained" color="primary">
                Add Product
              </Button>
              <Button variant="outlined" color="secondary" onClick={() => navigate("/products")}>
                Cancel
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AddProduct;
