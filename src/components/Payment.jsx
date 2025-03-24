import React, { useState } from "react";
import { Container, Grid, Card, CardContent, Typography, Button, TextField, Checkbox, FormControlLabel, Box } from "@mui/material";
import { FaCheckCircle } from "react-icons/fa";

const PaymentPage = () => {
  const [addOn, setAddOn] = useState(false);

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Typography variant="h4" textAlign="center" gutterBottom>
        Bid Receipt
      </Typography>

      <Grid container spacing={4}>
        {/* Left Section - Order Summary */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" color="primary">
                $169.00
              </Typography>
              <Box component="img" src="https://via.placeholder.com/400x200.png?text=Pangea+Design+System" alt="Product" sx={{ width: "100%", borderRadius: 2, mt: 2 }} />
              <Typography variant="h6" mt={2}>Headphones</Typography>
              <Typography variant="body2" color="textSecondary">
                Noise-canceling headphones for immersive sound
              </Typography>
              <Box mt={2}>
                <Typography variant="body1"><strong>Items Subtotal:</strong> $169.00</Typography>
                <Typography variant="body1"><strong>Tax:</strong> $1.00</Typography>
                <Typography variant="h6" mt={1} color="secondary"><strong>Order Total:</strong> $170.00</Typography>
              </Box>
              <Typography variant="body2" color="textSecondary" mt={2}>
                ⚡ Instant Delivery to Email/SMS | Free Shipping 😊
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Section - Payment Form */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Information
              </Typography>
              <TextField fullWidth label="Full Name" variant="outlined" margin="normal" required />
              <TextField fullWidth label="Email" type="email" variant="outlined" margin="normal" required />
              <TextField fullWidth label="Phone" type="tel" variant="outlined" margin="normal" required />

              {/* Add-on Offer */}
              <Box mt={2} p={2} sx={{ border: "1px solid", borderColor: addOn ? "primary.main" : "grey.300", borderRadius: 2, cursor: "pointer" }} onClick={() => setAddOn(!addOn)}>
                <Box display="flex" alignItems="center">
                  <FaCheckCircle color={addOn ? "green" : "grey"} />
                  <Typography variant="body1" ml={1}>
                    Yes! I want to add <strong>$49.99</strong>
                  </Typography>
                </Box>
                <Typography variant="body2" color="textSecondary">
                  One Time Offer: Want our advanced funnel training? Learn the 9 secret funnels.
                </Typography>
              </Box>

              {/* Remember Information Checkbox */}
              <FormControlLabel control={<Checkbox />} label="Remember Information & Sign up for Texts" sx={{ mt: 2 }} />

              {/* Continue Button */}
              <Button variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
                Continue
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PaymentPage;
