import React from "react";
import { Container, Typography, TextField, Button, Box, Paper } from "@mui/material";

const Contact = () => {
  return (
    <Container maxWidth={false} sx={{ height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", backgroundColor: "#f5f5f5" }}>
      <Paper elevation={3} sx={{ p: 4, width: "50%" }}>
        <Typography variant="h4" gutterBottom>Contact Us</Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          Have questions? Get in touch with us!
        </Typography>

        <Box component="form" sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Full Name"
            variant="outlined"
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Email Address"
            type="email"
            variant="outlined"
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Message"
            multiline
            rows={5}
            variant="outlined"
            margin="normal"
            required
          />

          <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Send Message
          </Button>
        </Box>
      </Paper>

      <Paper elevation={3} sx={{ p: 3, mt: 4, width: "50%", textAlign: "left" }}>
        <Typography variant="h5">Our Contact Details</Typography>
        <Typography variant="body1">📍 Location: 123 WinBid Street, New York, USA</Typography>
        <Typography variant="body1">📧 Email: support@winbid.com</Typography>
        <Typography variant="body1">📞 Phone: +1 234 567 890</Typography>
      </Paper>
    </Container>
  );
};

export default Contact;