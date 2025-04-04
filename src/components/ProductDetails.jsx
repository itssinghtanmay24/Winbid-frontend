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
  IconButton,
  Paper,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import {
  ArrowBack,
  AttachMoney,
  Person,
  CalendarToday,
  Category,
} from "@mui/icons-material";
import productApi from "../services/productApi";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [product, setProduct] = useState(null);
  const [ownerName, setOwnerName] = useState(null);
  const [winnerName, setWinnerName] = useState(null);
  const [loading, setLoading] = useState(!location.state?.product);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await productApi.getProductById(id);
        setProduct(productData.data);

        // Fetch owner data and update state
        const ownerData = productData.data.owner
          ? await productApi.getUsernameById(productData.data.owner)
          : "";
        const winnerData = productData.data.winner
          ? await productApi.getUsernameById(productData.data.winner)
          : null;
        setOwnerName(ownerData?.data);
        setWinnerName(winnerData?.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 5, textAlign: "center" }}>
        <LinearProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading product details...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 5, textAlign: "center" }}>
        <Typography variant="h6" color="error">
          Error: {error}
        </Typography>
        <Button variant="contained" sx={{ mt: 2 }} onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container maxWidth="md" sx={{ py: 5, textAlign: "center" }}>
        <Typography variant="h6">Product not found</Typography>
        <Button variant="contained" sx={{ mt: 2 }} onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </Container>
    );
  }

  const bidCompletionPercentage =
    (product.currentBidCount / product.totalBids) * 100;

  return (
    <Container maxWidth="lg" sx={{ py: 4, mt: 4 }}>
      <IconButton onClick={() => navigate(-1)} sx={{ mb: 2 }}>
        <ArrowBack /> Back
      </IconButton>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              height="400"
              image={product.imageUrl}
              alt={product.name}
              sx={{ objectFit: "contain" }}
            />
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h4" component="h1" gutterBottom>
                {product.name}
              </Typography>

              <Chip
                label={product.isClosed ? "Bidding Closed" : "Bidding Active"}
                color={product.isClosed ? "error" : "success"}
                sx={{ mb: 2 }}
              />

              <Typography variant="body1" paragraph>
                {product.description}
              </Typography>

              <Divider sx={{ my: 2 }} />

              <List>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <AttachMoney />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Current Bid Price"
                    secondary={`₹${product.bidPrice}`}
                  />
                </ListItem>

                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <Category />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Bids Progress"
                    secondary={`${product.currentBidCount} / ${product.totalBids}`}
                  />
                </ListItem>

                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <Person />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Owner" secondary={ownerName} />
                </ListItem>

                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <CalendarToday />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Created At"
                    secondary={new Date(product.createdAt).toLocaleDateString()}
                  />
                </ListItem>
              </List>

              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Bids Completion
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={bidCompletionPercentage}
                  sx={{ height: 10, borderRadius: 5 }}
                />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  align="right"
                >
                  {Math.round(bidCompletionPercentage)}%
                </Typography>
              </Box>

              {!product.isClosed && (
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  sx={{ mt: 3 }}
                  onClick={() => navigate(`/bid/${id}`)}
                >
                  Place a Bid
                </Button>
              )}

              {product.winner && (
                <Paper
                  elevation={0}
                  sx={{ p: 2, mt: 2, bgcolor: "success.light" }}
                >
                  <Typography variant="subtitle1">
                    Winner: {winnerName}
                  </Typography>
                </Paper>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetails;
