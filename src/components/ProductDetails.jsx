import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { 
  Container, 
  Grid, 
  Card, 
  CardMedia, 
  CardContent, 
  Typography, 
  Button, 
  LinearProgress, 
  Box, 
  Chip,
  Divider,
  IconButton
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import productApi from "../services/productApi";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [product, setProduct] = useState(location.state?.product || null);
  const [loading, setLoading] = useState(!location.state?.product);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!product) {
      const fetchProduct = async () => {
        try {
          const productData = await productApi.getProductById(id);
          const completedBids = await productApi.getCompletedBids(id);
          const winnerId = await productApi.getProductWinner(id);
          
          setProduct({
            ...productData,
            completedBids,
            winnerId
          });
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      
      fetchProduct();
    }
  }, [id, product]);

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 5, textAlign: 'center' }}>
        <Typography variant="h6">Loading product details...</Typography>
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

  if (!product) {
    return (
      <Container maxWidth="md" sx={{ py: 5, textAlign: 'center' }}>
        <Typography variant="h6">Product not found</Typography>
      </Container>
    );
  }

  const bidCompletionPercentage = (product.completedBids / product.totalBids) * 100;

  return (
    <Container maxWidth="lg" sx={{ py: 4 ,mt:20}}>
      <Box sx={{ mb: 3 }}>
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h4" component="h1" display="inline" sx={{ ml: 2 }}>
          {product.name}
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Product Image */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              height="400"
              image={product.imageUrl || "https://via.placeholder.com/400"}
              alt={product.name}
              sx={{
                objectFit: 'cover',
                filter: product.winnerId !== 0 ? 'grayscale(100%)' : 'none',
                opacity: product.winnerId !== 0 ? 0.7 : 1
              }}
            />
          </Card>
        </Grid>

        {/* Product Details */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              {product.winnerId !== 0 && (
                <Chip
                  label={`Winner: User ${product.winnerId}`}
                  color="error"
                  sx={{ mb: 2 }}
                />
              )}

              <Typography variant="h5" gutterBottom>
                {product.name}
              </Typography>

              <Typography variant="body1" paragraph>
                {product.description}
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" color="primary" gutterBottom>
                  Current Bid: ₹{product.bidPrice?.toFixed(2)}
                </Typography>

                <Box sx={{ mt: 2 }}>
                  <LinearProgress 
                    variant="determinate" 
                    value={bidCompletionPercentage} 
                    sx={{ height: 10, borderRadius: 5 }}
                  />
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {product.completedBids} of {product.totalBids} bids placed
                    ({bidCompletionPercentage.toFixed(0)}% complete)
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                  onClick={() => navigate('/payment', { state: { product } })}
                  disabled={product.winnerId !== 0}
                >
                  {product.winnerId !== 0 ? 'Bidding Closed' : 'Place Bid'}
                </Button>

                <Button
                  variant="outlined"
                  color="secondary"
                  size="large"
                  fullWidth
                  onClick={() => navigate(-1)}
                >
                  Back to Products
                </Button>
              </Box>

              <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid #eee' }}>
                <Typography variant="body2" color="textSecondary">
                  <strong>Listed on:</strong> {new Date(product.createdAt).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Last updated:</strong> {new Date(product.updatedAt).toLocaleDateString()}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetails;