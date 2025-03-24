import React from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { Container, Grid, Card, CardMedia, CardContent, Typography, Button, LinearProgress, Fab, Box, Tooltip } from "@mui/material";

const products = [
  { id: 1, name: "Smartphone", description: "Latest model with advanced features.", imageUrl: "https://via.placeholder.com/150", bidPrice: 99, totalBids: 100, completedBids: 75 },
  { id: 2, name: "Laptop", description: "Powerful laptop for work and gaming.", imageUrl: "https://via.placeholder.com/150", bidPrice: 49, totalBids: 80, completedBids: 40 },
  { id: 3, name: "Headphones", description: "Noise-canceling headphones for immersive sound.", imageUrl: "https://via.placeholder.com/150", bidPrice: 59, totalBids: 120, completedBids: 90 },
  { id: 4, name: "Smartwatch", description: "Track fitness and stay connected on the go.", imageUrl: "https://via.placeholder.com/150", bidPrice: 79, totalBids: 50, completedBids: 20 },
];

const Products = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Available Products
      </Typography>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <Card>
              <CardMedia component="img" height="150" image={product.imageUrl} alt={product.name} />
              <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  {product.description}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>Bid Price: ₹{product.bidPrice}</Typography>
                <Box sx={{ mt: 2 }}>
                  <LinearProgress variant="determinate" value={(product.completedBids / product.totalBids) * 100} />
                  <Typography variant="body2" align="center" sx={{ mt: 1 }}>
                    {product.completedBids} / {product.totalBids} Bids Completed
                  </Typography>
                </Box>
                <Button fullWidth variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => navigate(`/payment`)}>
                  Place Bid
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Floating Add Product Button with Tooltip */}
      <Tooltip title="Add New Product" arrow>
        <Fab color="secondary" aria-label="add" sx={{ position: "fixed", bottom: 16, right: 16, zIndex: 1000, backgroundColor: "#f50057", '&:hover': { backgroundColor: "#c51162" } }} onClick={() => navigate("/add-product")}>
          <FaPlus size={20} />
        </Fab>
      </Tooltip>
    </Container>
  );
};

export default Products;