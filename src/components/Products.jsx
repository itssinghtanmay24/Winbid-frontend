import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { Container, Grid, Card, CardMedia, CardContent, Typography, Button, LinearProgress, Fab, Box, Tooltip } from "@mui/material";
import productApi from "../services/productApi";
import AddProductForm from "./AddProductForm";

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productApi.getAllProducts();
        
        // Fetch completed bids and winner for each product
        const productsWithBidsAndWinner = await Promise.all(
          data.map(async (product) => {
            try {
              const completedBids = await productApi.getCompletedBids(product.id);
              const winnerId = await productApi.getProductWinner(product.id);
              
              return {
                ...product,
                completedBids: completedBids,
                winnerId: winnerId
              };
            } catch (err) {
              console.error(`Error fetching data for product ${product.id}:`, err);
              return {
                ...product,
                completedBids: 0, // Default value if there's an error
                winnerId: 0       // Default value if there's an error
              };
            }
          })
        );
        
        setProducts(productsWithBidsAndWinner);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchProducts();
  }, []);



  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 5, textAlign: 'center' }}>
        <Typography variant="h6">Loading products...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 5, textAlign: 'center' }}>
        <Typography variant="h6" color="error">Error: {error}</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Available Products
      </Typography>
      <Grid container spacing={3}>
      {products.map((product) => (
        <Grid item key={product.id} xs={12} sm={6} md={4}>
          <Card 
            sx={{ 
              cursor: 'pointer',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.02)'
              }
            }}
            onClick={() => navigate(`/products/${product.id}`, { state: { product } })}
          >
            <Box position="relative">
              <CardMedia 
                component="img" 
                height="150" 
                image={product.imageUrl || "https://via.placeholder.com/150"} 
                alt={product.name}
                sx={{
                  filter: product.winnerId !== 0 ? 'grayscale(100%)' : 'none',
                  opacity: product.winnerId !== 0 ? 0.7 : 1
                }}
              />
              {product.winnerId !== 0 && (
                <Box
                  position="absolute"
                  top="50%"
                  left="50%"
                  sx={{
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: 'rgba(218, 54, 25, 0.7)',
                    color: 'white',
                    padding: '5px 10px',
                    borderRadius: '4px'
                  }}
                >
                  <Typography variant="subtitle2">
                    Winner: User {product.winnerId}
                  </Typography>
                </Box>
              )}
            </Box>
            <CardContent>
              <Typography variant="h6">{product.name}</Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                {product.description}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Bid Price: ₹{product.bidPrice}
              </Typography>
              <Box sx={{ mt: 2 }}>
                <LinearProgress 
                  variant="determinate" 
                  value={(product.completedBids / product.totalBids) * 100} 
                />
                <Typography variant="body2" align="center" sx={{ mt: 1 }}>
                  {product.completedBids} / {product.totalBids} Bids Completed
                </Typography>
              </Box>
              <Button 
                fullWidth 
                variant="contained" 
                color="primary" 
                sx={{ mt: 2 }} 
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/payment`, { state: { product } });
                }}
                disabled={product.winnerId !== 0}
              >
                {product.winnerId !== 0 ? 'Bidding Closed' : 'Place Bid'}
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
      </Grid>

      <Tooltip title="Add New Product" arrow>
        <Fab 
          color="secondary" 
          aria-label="add" 
          sx={{ 
            position: "fixed", 
            bottom: 16, 
            right: 16, 
            zIndex: 1000, 
            backgroundColor: "#f50057", 
            '&:hover': { backgroundColor: "#c51162" } 
          }} 
          onClick={() =>{
            <AddProductForm adminRole={role}/>
            navigate("/addProduct")}
          } 
        >
          <FaPlus size={20} />
        </Fab>
      </Tooltip>
    </Container>
  );
};

export default Products;