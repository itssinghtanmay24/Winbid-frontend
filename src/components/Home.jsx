import React from "react";
import { Link } from "react-router-dom";
import { Container, Typography, Button, Box, Stack, Grid, Card, CardContent } from "@mui/material";

const HomePage = () => {
  return (
    <Container maxWidth={false} sx={{ py: 0 }}>
      {/* Hero Section */}
      <Box sx={{ 
        textAlign: "center", 
        py: 8,
        background: "linear-gradient(to bottom, #ffffff, #f5f5f5)"
      }}>
        <Container maxWidth="lg">
          <Typography 
            variant="h2" 
            sx={{ 
              fontWeight: 'bold', 
              mb: 3,
              lineHeight: 1.2
            }}
          >
            Transform browsing into buying, and<br />
            convert your platform visits into revenue.
          </Typography>
          
          <Typography 
            variant="h5" 
            sx={{ 
              color: 'text.secondary',
              mb: 4,
              maxWidth: '800px',
              mx: 'auto'
            }}
          >
            Imagine turning every shopping cart abandonment into a potential sale. 
            With WinBid, every transaction offers customers the thrill of winning big 
            for just a fraction of the cost.
          </Typography>
          
          <Stack 
            direction="row" 
            spacing={3} 
            justifyContent="center"
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
                borderRadius: '8px',
                textTransform: 'none',
                fontSize: '1rem'
              }}
            >
              Google Play
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="large"
              component="a"
              href="#"
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: '8px',
                textTransform: 'none',
                fontSize: '1rem'
              }}
            >
              App Store
            </Button>
          </Stack>
        </Container>
      </Box>

      {/* Start Bidding Section */}
      <Box sx={{ 
        py: 8,
        backgroundColor: "primary.main", 
        color: "white", 
        textAlign: "center"
      }}>
        <Container maxWidth="lg">
          <Typography variant="h3">WinBid - Try Your Luck & Win Big!</Typography>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Bid Small, Win Big! One lucky bidder gets the prize.
          </Typography>
          <Button 
            component={Link} 
            to="/products" 
            variant="contained" 
            color="secondary" 
            sx={{ 
              mt: 3,
              px: 4,
              py: 1.5,
              borderRadius: '8px',
              textTransform: 'none',
              fontSize: '1rem'
            }}
          >
            Start Bidding
          </Button>
        </Container>
      </Box>

      {/* How It Works */}
      <Box sx={{ 
        py: 8,
        backgroundColor: "#f9f9f9",
        textAlign: "center"
      }}>
        <Container maxWidth="lg">
          <Typography variant="h4" sx={{ mb: 4 }}>How It Works</Typography>
          <Grid container spacing={3} justifyContent="center">
            {[
              { 
                title: "Choose a Product", 
                description: "Select from a variety of premium products." 
              },
              { 
                title: "Place a Small Bid", 
                description: "Pay a minimal entry fee to participate." 
              },
              { 
                title: "Get Lucky & Win", 
                description: "One random lucky bidder wins the product!" 
              }
            ].map((step, index) => (
              <Grid item key={index} xs={12} sm={4}>
                <Card sx={{ 
                  p: 3,
                  height: "100%",
                  boxShadow: 3,
                  borderRadius: '12px'
                }}>
                  <CardContent>
                    <Typography variant="h5" sx={{ mb: 2 }}>{step.title}</Typography>
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
      <Box sx={{ 
        py: 8,
        textAlign: "center"
      }}>
        <Container maxWidth="lg">
          <Typography variant="h4" sx={{ mb: 4 }}>Featured Bids</Typography>
          <Grid container spacing={4} justifyContent="center">
            {[
              { 
                title: "Smartphone Giveaway", 
                price: "$1" 
              },
              { 
                title: "Luxury Watch", 
                price: "$2" 
              },
              { 
                title: "Gaming Console", 
                price: "$3" 
              }
            ].map((item, index) => (
              <Grid item key={index} xs={12} sm={4}>
                <Card sx={{ 
                  p: 3,
                  height: "100%",
                  boxShadow: 3,
                  borderRadius: '12px',
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'scale(1.03)'
                  }
                }}>
                  <CardContent>
                    <Typography variant="h5" sx={{ mb: 1 }}>{item.title}</Typography>
                    <Typography variant="body1" color="textSecondary" sx={{ mb: 2 }}>
                      Starting at just {item.price}
                    </Typography>
                    <Button
                      variant="outlined"
                      color="primary"
                      component={Link}
                      to="/products"
                      sx={{
                        borderRadius: '8px',
                        textTransform: 'none'
                      }}
                    >
                      Bid Now
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Container>
  );
};

export default HomePage;