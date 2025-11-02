import React, { useState } from "react";
import { 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Box, 
  Paper,
  Grid,
  Divider,
  Avatar,
  Stack,
  useTheme,
  Alert,
  CircularProgress
} from "@mui/material";
import {
  LocationOn,
  Email,
  Phone,
  Send
} from "@mui/icons-material";
import api from "../services/api";

const Contact = () => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear errors when user starts typing
    if (error) setError("");
    if (success) setSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);

    try {
      // Validate required fields
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.subject || !formData.message) {
        setError("Please fill in all required fields");
        setLoading(false);
        return;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setError("Please enter a valid email address");
        setLoading(false);
        return;
      }

      const response = await api.post("/contact", {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim()
      });

      if (response.data) {
        setSuccess(true);
        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          subject: "",
          message: ""
        });
        // Clear success message after 5 seconds
        setTimeout(() => setSuccess(false), 5000);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 
                          err.response?.data?.error || 
                          "Failed to send message. Please try again later.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Container maxWidth={false} sx={{ 
      minHeight: "100vh",
      py: 8,
      background: "linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <Typography variant="h3" sx={{ 
        mb: 4, 
        fontWeight: 700,
        color: theme.palette.primary.main,
        textAlign: "center"
      }}>
        Contact Us
      </Typography>
      
      <Typography variant="subtitle1" sx={{ 
        mb: 6, 
        maxWidth: "600px",
        textAlign: "center",
        color: theme.palette.text.secondary
      }}>
        We'd love to hear from you! Whether you have a question about our services, 
        partnerships, or anything else, our team is ready to answer all your questions.
      </Typography>
      
      <Grid container spacing={4} justifyContent="center" sx={{ width: "100%" }}>
        <Grid item xs={12} md={6}>
          <Paper elevation={6} sx={{ 
            p: 4, 
            borderRadius: 3,
            height: "100%",
            background: theme.palette.background.paper
          }}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
              Send us a message
            </Typography>
            
            {success && (
              <Alert severity="success" sx={{ mb: 2 }}>
                Thank you! Your message has been sent successfully. We'll get back to you soon.
              </Alert>
            )}
            
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            
            <Box component="form" onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    name="firstName"
                    label="First Name"
                    variant="outlined"
                    margin="normal"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    disabled={loading}
                    sx={{ 
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    name="lastName"
                    label="Last Name"
                    variant="outlined"
                    margin="normal"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    disabled={loading}
                    sx={{ 
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2
                      }
                    }}
                  />
                </Grid>
              </Grid>
              
              <TextField
                fullWidth
                name="email"
                label="Email Address"
                type="email"
                variant="outlined"
                margin="normal"
                required
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2
                  }
                }}
              />
              
              <TextField
                fullWidth
                name="subject"
                label="Subject"
                variant="outlined"
                margin="normal"
                required
                value={formData.subject}
                onChange={handleChange}
                disabled={loading}
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2
                  }
                }}
              />
              
              <TextField
                fullWidth
                name="message"
                label="Your Message"
                multiline
                rows={5}
                variant="outlined"
                margin="normal"
                required
                value={formData.message}
                onChange={handleChange}
                disabled={loading}
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2
                  },
                  mt: 2
                }}
              />
              
              <Button 
                type="submit"
                variant="contained" 
                color="primary" 
                fullWidth 
                size="large"
                endIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Send />}
                disabled={loading}
                sx={{ 
                  mt: 3,
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: 600,
                  fontSize: "1rem",
                  textTransform: "none",
                  boxShadow: theme.shadows[4],
                  '&:hover': {
                    boxShadow: theme.shadows[8],
                    transform: "translateY(-2px)",
                    transition: "all 0.3s ease"
                  },
                  '&:disabled': {
                    transform: "none"
                  }
                }}
              >
                {loading ? "Sending..." : "Send Message"}
              </Button>
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper elevation={6} sx={{ 
            p: 4, 
            borderRadius: 3,
            height: "100%",
            background: theme.palette.background.paper
          }}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
              Contact Information
            </Typography>
            
            <Typography variant="body1" sx={{ mb: 3, color: theme.palette.text.secondary }}>
              Feel free to reach out to us through any of these channels. 
              Our support team typically responds within 24 hours.
            </Typography>
            
            <Divider sx={{ my: 3 }} />
            
            <Stack spacing={3}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar sx={{ 
                  mr: 2, 
                  bgcolor: theme.palette.secondary.light,
                  color: theme.palette.secondary.main
                }}>
                  <LocationOn />
                </Avatar>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    Our Location
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    123 WinBid Street, New York, NY 10001, USA
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar sx={{ 
                  mr: 2, 
                  bgcolor: theme.palette.info.light,
                  color: theme.palette.info.main
                }}>
                  <Email />
                </Avatar>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    Email Us
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    support@winbid.com
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    sales@winbid.com
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar sx={{ 
                  mr: 2, 
                  bgcolor: theme.palette.success.light,
                  color: theme.palette.success.main
                }}>
                  <Phone />
                </Avatar>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    Call Us
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    +91 8604500009 (Sales)
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    +91 8604500009 (Support)
                  </Typography>
                </Box>
              </Box>
            </Stack>
            
            <Divider sx={{ my: 3 }} />
            
            <Typography variant="body2" color="textSecondary" sx={{ fontStyle: "italic" }}>
              Business Hours: Monday - Friday, 9:00 AM - 6:00 PM EST
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Contact;