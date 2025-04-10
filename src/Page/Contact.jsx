import React from "react";
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
  useTheme
} from "@mui/material";
import {
  LocationOn,
  Email,
  Phone,
  Send
} from "@mui/icons-material";

const Contact = () => {
  const theme = useTheme();
  
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
            
            <Box component="form">
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="First Name"
                    variant="outlined"
                    margin="normal"
                    required
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
                    label="Last Name"
                    variant="outlined"
                    margin="normal"
                    required
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
                label="Email Address"
                type="email"
                variant="outlined"
                margin="normal"
                required
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2
                  }
                }}
              />
              
              <TextField
                fullWidth
                label="Subject"
                variant="outlined"
                margin="normal"
                required
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2
                  }
                }}
              />
              
              <TextField
                fullWidth
                label="Your Message"
                multiline
                rows={5}
                variant="outlined"
                margin="normal"
                required
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2
                  },
                  mt: 2
                }}
              />
              
              <Button 
                variant="contained" 
                color="primary" 
                fullWidth 
                size="large"
                endIcon={<Send />}
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
                  }
                }}
              >
                Send Message
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
                    +1 (234) 567-8900 (Sales)
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    +1 (234) 567-8901 (Support)
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