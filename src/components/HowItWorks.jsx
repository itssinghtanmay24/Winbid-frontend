import React from "react";
import { Container, Typography, Grid, Card, CardContent } from "@mui/material";

const steps = [
  { title: "Explore Available Products", description: "Browse through our selection of exclusive products listed for bidding. Each product has a fixed, minimal bid price." },
  { title: "Place Your Bid", description: "Pay the single bid price for the product of your choice to participate in the bidding process." },
  { title: "Bidding Completion", description: "Once all bids for a product are completed, the bidding phase closes automatically." },
  { title: "Random Winner Selection", description: "Among all participants who placed a bid, one lucky winner is randomly selected to receive the product." },
  { title: "Product Delivery", description: "The selected winner will be notified, and the product will be shipped to them at no additional cost." },
  { title: "Admin-Controlled Product Listings", description: "All products on WinBid are genuine and added exclusively by our admin to ensure quality and authenticity." }
];

const HowItWorks = () => {
  return (
    <Container maxWidth="md" sx={{ py: 5, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Typography variant="h3" gutterBottom>How WinBid Works</Typography>
      <Grid container spacing={3} justifyContent="center" sx={{ mt: 3 }}>
        {steps.map((step, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <Card sx={{ p: 3, height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "center" }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {index + 1}. {step.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {step.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HowItWorks;
