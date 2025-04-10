import React from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Typography,
  Button,
  Box,
  Stack,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
} from "@mui/material";
import homeImg from "../assets/homeimg.png";
const smartphoneImg = "data:image/jpeg;base64,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";
const watchImg = "data:image/jpeg;base64,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";
const consoleImg = ".data:image/jpeg;base64,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";

const HomePage = () => {
  return (
    <Container maxWidth={false} sx={{ py: 0 }}>
      {/* Hero Section */}
      <Box
        sx={{
          textAlign: { xs: "center", md: "left" },
          py: 8,
          background: "linear-gradient(135deg, #ffffff 0%, #f0f7ff 100%)",
          position: "relative",
          overflow: "hidden",
          "&:before": {
            content: '""',
            position: "absolute",
            top: -100,
            right: -100,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "rgba(25, 118, 210, 0.05)",
          },
        }}
      >
        <Container maxWidth="lg">
          <Grid container alignItems="center" spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: "bold",
                  mb: 3,
                  lineHeight: 1.2,
                  fontSize: { xs: "2.5rem", md: "3.5rem" },
                  background: "linear-gradient(45deg, #1976d2 30%, #4dabf5 90%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Win Big With Tiny Bids!
              </Typography>

              <Typography
                variant="h5"
                sx={{
                  color: "text.secondary",
                  mb: 4,
                  fontSize: { xs: "1.1rem", md: "1.25rem" },
                }}
              >
                Turn every shopping cart into a potential jackpot. With WinBid, 
                you could win premium products for just a fraction of their retail price. 
                The thrill of winning is just a bid away!
              </Typography>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={3}
                sx={{ mt: 4 }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  component="a"
                  href="#"
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: "50px",
                    textTransform: "none",
                    fontSize: "1rem",
                    boxShadow: "0 4px 12px rgba(25, 118, 210, 0.3)",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 6px 16px rgba(25, 118, 210, 0.4)",
                    },
                    transition: "all 0.3s",
                  }}
                >
                  Download Now
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  component={Link}
                  to="/products"
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: "50px",
                    textTransform: "none",
                    fontSize: "1rem",
                    borderWidth: "2px",
                    "&:hover": {
                      borderWidth: "2px",
                      backgroundColor: "rgba(25, 118, 210, 0.04)",
                    },
                  }}
                >
                  Explore Bids
                </Button>
              </Stack>
              
              <Box sx={{ mt: 4, display: "flex", alignItems: "center", gap: 2 }}>
                <Box sx={{ display: "flex" }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Box key={star} sx={{ color: "#ffc107", fontSize: "1.5rem" }}>★</Box>
                  ))}
                </Box>
                <Typography variant="body2" color="text.secondary">
                  4.9/5 from 10,000+ happy winners
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  position: "relative",
                  height: "100%",
                  minHeight: { xs: "300px", md: "500px" },
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box
                  component="img"
                  src={homeImg}
                  alt="WinBid App"
                  sx={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                    borderRadius: 2,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                    position: "relative",
                    zIndex: 2,
                    transform: "rotate(-5deg)",
                    transition: "transform 0.5s",
                    "&:hover": {
                      transform: "rotate(0deg)",
                    },
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    top: "10%",
                    left: "5%",
                    zIndex: 3,
                    backgroundColor: "#ff5722",
                    color: "white",
                    px: 2,
                    py: 1,
                    borderRadius: "20px",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                    transform: "rotate(-10deg)",
                    animation: "pulse 2s infinite",
                  }}
                >
                  <Typography variant="body2" fontWeight="bold">
                    New Bid Added!
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Stats Section */}
      <Box sx={{ py: 4, backgroundColor: "#f5f9ff" }}>
        <Container maxWidth="lg">
          <Grid container spacing={3} justifyContent="center">
            {[
              { value: "10,000+", label: "Happy Winners" },
              { value: "$1M+", label: "In Prizes Won" },
              { value: "500+", label: "Premium Products" },
              { value: "98%", label: "Satisfaction Rate" },
            ].map((stat, index) => (
              <Grid item key={index} xs={6} sm={3}>
                <Box sx={{ textAlign: "center" }}>
                  <Typography variant="h4" color="primary" fontWeight="bold">
                    {stat.value}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {stat.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Start Bidding Section */}
      <Box
        sx={{
          py: 8,
          background: "linear-gradient(135deg, #1976d2 0%, #4dabf5 100%)",
          color: "white",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
          "&:before": {
            content: '""',
            position: "absolute",
            top: -50,
            right: -50,
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.1)",
          },
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h3" sx={{ mb: 3, fontWeight: "bold" }}>
            Your Next Big Win Starts Here!
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, maxWidth: 700, mx: "auto" }}>
            Join thousands of users who've won amazing products for just a few dollars.
            Why pay full price when you can win it?
          </Typography>
          <Button
            component={Link}
            to="/products"
            variant="contained"
            color="secondary"
            sx={{
              mt: 3,
              px: 6,
              py: 1.5,
              borderRadius: "50px",
              textTransform: "none",
              fontSize: "1.1rem",
              fontWeight: "bold",
              boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
              "&:hover": {
                transform: "translateY(-3px)",
                boxShadow: "0 12px 20px rgba(0,0,0,0.3)",
              },
              transition: "all 0.3s",
            }}
          >
            Start Bidding Now
          </Button>
        </Container>
      </Box>

      {/* How It Works */}
      <Box
        sx={{
          py: 8,
          backgroundColor: "#f9f9f9",
          textAlign: "center",
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold" }}>
            How It Works
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 6, maxWidth: 700, mx: "auto" }}>
            Winning has never been easier. Just follow these simple steps:
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {[
              {
                title: "Choose a Product",
                description: "Select from our curated collection of premium products you'd love to win.",
                icon: "🛒",
              },
              {
                title: "Place Your Bid",
                description: "Pay a small entry fee (as low as $1) to participate in the auction.",
                icon: "💰",
              },
              {
                title: "Wait for Results",
                description: "When the auction ends, one lucky bidder wins the product at an incredible value!",
                icon: "🎉",
              },
            ].map((step, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    p: 3,
                    height: "100%",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                    borderRadius: "16px",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      transform: "translateY(-10px)",
                      boxShadow: "0 12px 28px rgba(0,0,0,0.12)",
                    },
                  }}
                >
                  <CardContent>
                    <Box sx={{
                      width: 80,
                      height: 80,
                      borderRadius: "50%",
                      backgroundColor: "rgba(25, 118, 210, 0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "2.5rem",
                      mb: 3,
                      mx: "auto",
                    }}>
                      {step.icon}
                    </Box>
                    <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
                      {step.title}
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                      {step.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Featured Bids */}
      <Box
        sx={{
          py: 8,
          textAlign: "center",
          background: "linear-gradient(to bottom, #f9f9f9, #ffffff)",
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold" }}>
            Hot Auctions Ending Soon!
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 6, maxWidth: 700, mx: "auto" }}>
            Don't miss your chance to win these amazing products. Place your bid today!
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {[
              {
                title: "iPhone 15 Pro Max",
                price: "$1",
                retail: "$1,099",
                image: smartphoneImg,
                bids: 1243,
                timeLeft: "2h 15m",
              },
              {
                title: "Rolex Submariner",
                price: "$2",
                retail: "$8,000",
                image: watchImg,
                bids: 892,
                timeLeft: "4h 30m",
              },
              {
                title: "PlayStation 5 Bundle",
                price: "$3",
                retail: "$499",
                image: consoleImg,
                bids: 1567,
                timeLeft: "1h 45m",
              },
            ].map((item, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: "100%",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                    borderRadius: "16px",
                    overflow: "hidden",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      transform: "translateY(-10px)",
                      boxShadow: "0 12px 28px rgba(0,0,0,0.15)",
                    },
                  }}
                >
                  <Box sx={{ position: "relative" }}>
                    <CardMedia
                      component="img"
                      height="220"
                      image={item.image}
                      alt={item.title}
                      sx={{ objectFit: "contain", p: 2 }}
                    />
                    <Chip
                      label={`${item.timeLeft} left`}
                      color="error"
                      size="small"
                      sx={{
                        position: "absolute",
                        top: 16,
                        right: 16,
                        fontWeight: "bold",
                      }}
                    />
                  </Box>
                  <CardContent sx={{ textAlign: "left" }}>
                    <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold" }}>
                      {item.title}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        Retail:{" "}
                        <span style={{ textDecoration: "line-through" }}>
                          {item.retail}
                        </span>
                      </Typography>
                      <Typography
                        variant="body1"
                        color="primary"
                        sx={{ ml: 2, fontWeight: "bold" }}
                      >
                        Bid from {item.price}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {item.bids.toLocaleString()} bids placed
                    </Typography>
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      component={Link}
                      to="/products"
                      sx={{
                        borderRadius: "8px",
                        textTransform: "none",
                        py: 1.5,
                        fontWeight: "bold",
                      }}
                    >
                      Place Your Bid
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Button
            variant="outlined"
            color="primary"
            component={Link}
            to="/products"
            sx={{
              mt: 6,
              px: 6,
              py: 1.5,
              borderRadius: "50px",
              textTransform: "none",
              fontSize: "1rem",
              fontWeight: "bold",
              borderWidth: "2px",
            }}
          >
            View All Auctions
          </Button>
        </Container>
      </Box>

      {/* Testimonials */}
      <Box sx={{ py: 8, backgroundColor: "#f5f9ff", textAlign: "center" }}>
        <Container maxWidth="lg">
          <Typography variant="h4" sx={{ mb: 6, fontWeight: "bold" }}>
            Success Stories
          </Typography>
          <Grid container spacing={4}>
            {[
              {
                name: "Sarah J.",
                win: "MacBook Pro",
                quote: "I won a $2,000 MacBook for just $5! Couldn't believe it when I got the notification. WinBid is legit!",
                avatar: "👩",
              },
              {
                name: "Michael T.",
                win: "Sony OLED TV",
                quote: "After a few tries, I won a 65-inch OLED TV. The thrill is addictive and the savings are unbelievable!",
                avatar: "👨",
              },
              {
                name: "Emma & David",
                win: "Maldives Vacation",
                quote: "Our dream honeymoon for $20 instead of $5,000! Best money we ever spent. Thank you WinBid!",
                avatar: "👫",
              },
            ].map((testimonial, index) => (
              <Grid item key={index} xs={12} md={4}>
                <Card
                  sx={{
                    p: 3,
                    height: "100%",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                    borderRadius: "16px",
                  }}
                >
                  <CardContent>
                    <Box sx={{
                      width: 60,
                      height: 60,
                      borderRadius: "50%",
                      backgroundColor: "rgba(25, 118, 210, 0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "2rem",
                      mb: 3,
                      mx: "auto",
                    }}>
                      {testimonial.avatar}
                    </Box>
                    <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold" }}>
                      {testimonial.name}
                    </Typography>
                    <Typography variant="body2" color="primary" sx={{ mb: 2, fontWeight: "bold" }}>
                      Won: {testimonial.win}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ fontStyle: "italic" }}>
                      "{testimonial.quote}"
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Final CTA */}
      <Box sx={{ py: 8, textAlign: "center" }}>
        <Container maxWidth="sm">
          <Typography variant="h3" sx={{ mb: 3, fontWeight: "bold" }}>
            Ready to Win Big?
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Join thousands of happy winners today. Your dream product could be just one bid away!
          </Typography>
          <Button
            component={Link}
            to="/products"
            variant="contained"
            color="primary"
            size="large"
            sx={{
              px: 6,
              py: 1.5,
              borderRadius: "50px",
              textTransform: "none",
              fontSize: "1.1rem",
              fontWeight: "bold",
              boxShadow: "0 8px 16px rgba(25, 118, 210, 0.3)",
            }}
          >
            Start Bidding Now
          </Button>
        </Container>
      </Box>
    </Container>
  );
};

export default HomePage;