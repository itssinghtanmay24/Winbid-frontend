import React from "react";
import { 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Box,
  Avatar,
  useTheme,
  Divider,
  Button
} from "@mui/material";
import {
  Search,
  Gavel,
  CheckCircle,
  Shuffle,
  LocalShipping,
  AdminPanelSettings
} from "@mui/icons-material";

const steps = [
  { 
    title: "Explore Available Products", 
    description: "Browse through our selection of exclusive products listed for bidding. Each product has a fixed, minimal bid price.",
    icon: <Search fontSize="large" />,
    color: "primary"
  },
  { 
    title: "Place Your Bid", 
    description: "Pay the single bid price for the product of your choice to participate in the bidding process.",
    icon: <Gavel fontSize="large" />,
    color: "secondary"
  },
  { 
    title: "Bidding Completion", 
    description: "Once all bids for a product are completed, the bidding phase closes automatically.",
    icon: <CheckCircle fontSize="large" />,
    color: "success"
  },
  { 
    title: "Random Winner Selection", 
    description: "Among all participants who placed a bid, one lucky winner is randomly selected to receive the product.",
    icon: <Shuffle fontSize="large" />,
    color: "info"
  },
  { 
    title: "Product Delivery", 
    description: "The selected winner will be notified, and the product will be shipped to them at no additional cost.",
    icon: <LocalShipping fontSize="large" />,
    color: "warning"
  },
  { 
    title: "Admin-Controlled Product Listings", 
    description: "All products on WinBid are genuine and added exclusively by our admin to ensure quality and authenticity.",
    icon: <AdminPanelSettings fontSize="large" />,
    color: "error"
  }
];

const HowItWorks = () => {
  const theme = useTheme();
  
  return (
    <Box sx={{ 
      py: 8,
      background: "linear-gradient(to bottom, #ffffff 0%, #f9f9f9 100%)",
      position: "relative",
      overflow: "hidden",
      '&:before': {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "8px",
        background: theme.palette.primary.main,
        zIndex: 1
      }
    }}>
      <Container maxWidth="lg">
        <Box sx={{ 
          textAlign: "center",
          mb: 6,
          position: "relative",
          '&:after': {
            content: '""',
            display: "block",
            width: "80px",
            height: "4px",
            background: theme.palette.primary.main,
            margin: "16px auto 0",
            borderRadius: "2px"
          }
        }}>
          <Typography 
            variant="h3" 
            sx={{ 
              fontWeight: 700,
              mb: 2,
              color: theme.palette.text.primary
            }}
          >
            How WinBid Works
          </Typography>
          <Typography 
            variant="subtitle1" 
            sx={{ 
              maxWidth: "700px",
              mx: "auto",
              color: theme.palette.text.secondary
            }}
          >
            Our simple and transparent process ensures a fair chance for everyone to win amazing products at incredible prices.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {steps.map((step, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card sx={{ 
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                p: 3,
                borderRadius: 3,
                boxShadow: theme.shadows[4],
                transition: "all 0.3s ease",
                '&:hover': {
                  transform: "translateY(-8px)",
                  boxShadow: theme.shadows[8]
                }
              }}>
                <Avatar sx={{ 
                  width: 72, 
                  height: 72, 
                  mb: 3,
                  bgcolor: `${theme.palette[step.color].light}`,
                  color: `${theme.palette[step.color].main}`,
                  '& .MuiSvgIcon-root': {
                    fontSize: "2rem"
                  }
                }}>
                  {step.icon}
                </Avatar>
                <CardContent sx={{ p: 0 }}>
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      mb: 2,
                      fontWeight: 600,
                      color: theme.palette.text.primary
                    }}
                  >
                    <Box 
                      component="span" 
                      sx={{ 
                        color: theme.palette.primary.main,
                        mr: 1
                      }}
                    >
                      {index + 1}.
                    </Box> 
                    {step.title}
                  </Typography>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      color: theme.palette.text.secondary
                    }}
                  >
                    {step.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ 
          textAlign: "center", 
          mt: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}>
          <Divider sx={{ 
            width: "80%", 
            mb: 4,
            borderColor: theme.palette.divider
          }} />
          <Typography 
            variant="h5" 
            sx={{ 
              mb: 3,
              fontWeight: 600,
              color: theme.palette.text.primary
            }}
          >
            Ready to start bidding?
          </Typography>
          <Button 
            variant="contained" 
            size="large" 
            to="/products"
            color="primary"
            sx={{
              px: 6,
              py: 1.5,
              borderRadius: 2,
              fontWeight: 600,
              fontSize: "1rem",
              textTransform: "none",
              boxShadow: theme.shadows[4],
              '&:hover': {
                boxShadow: theme.shadows[8],
                transform: "translateY(-2px)"
              }
            }}
          >
            Browse Products
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default HowItWorks;