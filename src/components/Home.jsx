import React from "react";
import { Link } from "react-router-dom";
import { Container, Typography, Button, Grid, Card, CardContent, Box } from "@mui/material";

const HomePage = () => {
  return (
    <Container maxWidth={false} sx={{ textAlign: "center", py: 5, backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
      {/* Hero Section */}
      <Box sx={{ py: 5, backgroundColor: "primary.main", color: "white", borderRadius: 2 }}>
        <Typography variant="h3">WinBid - Try Your Luck & Win Big!</Typography>
        <Typography variant="h6" sx={{ mt: 2 }}>Bid Small, Win Big! One lucky bidder gets the prize.</Typography>
        <Button component={Link} to="/products" variant="contained" color="secondary" sx={{ mt: 3 }}>
          Start Bidding
        </Button>
      </Box>

      {/* How It Works */}
      <Box sx={{ my: 5 }}>
        <Typography variant="h4">How It Works</Typography>
        <Grid container spacing={3} justifyContent="center" sx={{ mt: 3 }}>
          {[
            { title: "Choose a Product", description: "Select from a variety of premium products." },
            { title: "Place a Small Bid", description: "Pay a minimal entry fee to participate." },
            { title: "Get Lucky & Win", description: "One random lucky bidder wins the product!" }
          ].map((step, index) => (
            <Grid item key={index} xs={12} sm={4}>
              <Card sx={{ p: 2 }}>
                <CardContent>
                  <Typography variant="h6">{step.title}</Typography>
                  <Typography variant="body2" color="textSecondary">{step.description}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Featured Bids */}
      <Box sx={{ my: 5 }}>
        <Typography variant="h4">Featured Bids</Typography>
        <Grid container spacing={3} justifyContent="center" sx={{ mt: 3 }}>
          {[
            { title: "Smartphone Giveaway", price: "$1" },
            { title: "Luxury Watch", price: "$2" },
            { title: "Gaming Console", price: "$3" }
          ].map((item, index) => (
            <Grid item key={index} xs={12} sm={4}>
              <Card sx={{ p: 2, textAlign: "center" }}>
                <CardContent>
                  <Typography variant="h6">{item.title}</Typography>
                  <Typography variant="body2" color="textSecondary">Starting at just {item.price}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default HomePage;