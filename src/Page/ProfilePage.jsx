import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Avatar, 
  Paper, 
  Grid, 
  Divider,
  CircularProgress,
  Alert,
  TextField,
  Button,
  Box,
  Snackbar,
  Chip,
  Tabs,
  Tab,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Badge,
  IconButton
} from '@mui/material';
import { 
  Email, 
  Person, 
  Phone, 
  Home, 
  Edit, 
  Save, 
  Cancel,
  DateRange,
  Work,
  Payment,
  LocalShipping,
  Star,
  StarBorder,
  Favorite,
  ShoppingCart,
  History,
  Settings,
  Notifications,
  Help
} from '@mui/icons-material';
import productApi from '../services/productApi';
import { styled } from '@mui/material/styles';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

const ProfilePage = () => {
  const { Id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState({
    phone: '',
    address: {
      street: '',
      street2: '',
      city: '',
      state: '',
      postalCode: '',
      country: ''
    }
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const userResponse = await productApi.getUserByID(Id);
        setUser(userResponse.data);
        setFormData({
          phone: userResponse.data.phone || '',
          address: {
            street: userResponse.data.address?.street || '',
            street2: userResponse.data.address?.street2 || '',
            city: userResponse.data.address?.city || '',
            state: userResponse.data.address?.state || '',
            postalCode: userResponse.data.address?.postalCode || '',
            country: userResponse.data.address?.country || 'US'
          }
        });
      } catch (err) {
        setError(err.message || 'Failed to load profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [Id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('address.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const updatedUser = await productApi.updateUser(email, formData);
      setUser(updatedUser.data);
      setEditMode(false);
      setSnackbar({
        open: true,
        message: 'Profile updated successfully!',
        severity: 'success'
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.message || 'Failed to update profile',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '80vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8ed 100%)'
      }}>
        <Box textAlign="center">
          <CircularProgress size={60} thickness={4} sx={{ color: 'primary.main' }} />
          <Typography variant="h6" sx={{ mt: 3, color: 'text.secondary' }}>
            Loading your profile...
          </Typography>
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ 
        py: 8, 
        textAlign: 'center',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8ed 100%)'
      }}>
        <Alert severity="error" sx={{ maxWidth: 600, mx: 'auto' }}>
          <Typography variant="h6">{error}</Typography>
          <Button variant="contained" color="primary" sx={{ mt: 2 }}>
            Try Again
          </Button>
        </Alert>
      </Container>
    );
  }

  if (!user) {
    return (
      <Container maxWidth="lg" sx={{ 
        py: 8, 
        textAlign: 'center',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8ed 100%)'
      }}>
        <Typography variant="h4" sx={{ mb: 2 }}>User not found</Typography>
        <Typography variant="body1" color="text.secondary">
          The profile you're looking for doesn't exist or may have been removed.
        </Typography>
      </Container>
    );
  }

  return (
    <Box sx={{ 
      background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8ed 100%)',
      minHeight: '100vh',
      py: 4
    }}>
      <Container maxWidth="lg">
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert 
            severity={snackbar.severity} 
            onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>

        {/* Header Section */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 4 
        }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            My Profile
          </Typography>
          <Box>
            <IconButton sx={{ mx: 1 }}>
              <Notifications />
            </IconButton>
            <IconButton sx={{ mx: 1 }}>
              <Settings />
            </IconButton>
            <IconButton sx={{ mx: 1 }}>
              <Help />
            </IconButton>
          </Box>
        </Box>

        <Grid container spacing={4}>
          {/* Left Sidebar */}
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ 
              borderRadius: '16px', 
              overflow: 'hidden',
              boxShadow: '0 8px 16px rgba(0,0,0,0.08)'
            }}>
              <Box sx={{ 
                background: 'linear-gradient(135deg, #1976d2 0%, #4dabf5 100%)', 
                py: 4,
                textAlign: 'center'
              }}>
                <StyledBadge
                  overlap="circular"
                  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                  badgeContent={
                    <Chip 
                      label="Pro" 
                      size="small" 
                      color="secondary" 
                      sx={{ fontWeight: 'bold' }}
                    />
                  }
                >
                  <Avatar sx={{ 
                    width: 120, 
                    height: 120, 
                    fontSize: 48,
                    mx: 'auto',
                    border: '4px solid white',
                    bgcolor: 'primary.dark'
                  }}>
                    {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                  </Avatar>
                </StyledBadge>
                <Typography variant="h5" component="h1" sx={{ 
                  mt: 2, 
                  color: 'white',
                  fontWeight: 'bold'
                }}>
                  {user.firstName} {user.lastName}
                </Typography>
                <Typography variant="subtitle1" sx={{ 
                  color: 'rgba(255,255,255,0.8)',
                  mb: 1
                }}>
                  @{user.username}
                </Typography>
                <Chip 
                  label={`${user.bids?.length || 0} Bids Placed`} 
                  color="secondary" 
                  size="small" 
                  sx={{ 
                    color: 'white',
                    fontWeight: 'bold',
                    backgroundColor: 'rgba(255,255,255,0.2)'
                  }}
                />
              </Box>

              <Box sx={{ p: 3 }}>
                <List dense>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'primary.light' }}>
                        <Email sx={{ color: 'primary.dark' }} />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText 
                      primary="Email" 
                      secondary={user.email} 
                      secondaryTypographyProps={{ color: 'text.primary' }}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'primary.light' }}>
                        <Phone sx={{ color: 'primary.dark' }} />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText 
                      primary="Phone" 
                      secondary={user.phone || 'Not provided'} 
                      secondaryTypographyProps={{ color: 'text.primary' }}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'primary.light' }}>
                        <DateRange sx={{ color: 'primary.dark' }} />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText 
                      primary="Member Since" 
                      secondary={formatDate(user.createdAt)} 
                      secondaryTypographyProps={{ color: 'text.primary' }}
                    />
                  </ListItem>
                </List>

                <Button 
                  fullWidth 
                  variant="contained" 
                  color="primary" 
                  startIcon={<Edit />} 
                  onClick={() => setEditMode(true)}
                  sx={{ 
                    mt: 2,
                    borderRadius: '12px',
                    py: 1.5,
                    fontWeight: 'bold'
                  }}
                >
                  Edit Profile
                </Button>
              </Box>
            </Paper>

            {/* Stats Card */}
            <Paper elevation={3} sx={{ 
              mt: 3, 
              p: 3, 
              borderRadius: '16px',
              boxShadow: '0 8px 16px rgba(0,0,0,0.08)'
            }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                My Stats
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Box sx={{ 
                    backgroundColor: 'rgba(25, 118, 210, 0.1)',
                    p: 2,
                    borderRadius: '12px',
                    textAlign: 'center'
                  }}>
                    <Typography variant="h4" color="primary" fontWeight="bold">
                      {user.bids?.length || 0}
                    </Typography>
                    <Typography variant="body2">
                      Total Bids
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ 
                    backgroundColor: 'rgba(76, 175, 80, 0.1)',
                    p: 2,
                    borderRadius: '12px',
                    textAlign: 'center'
                  }}>
                    <Typography variant="h4" color="success.main" fontWeight="bold">
                      12
                    </Typography>
                    <Typography variant="body2">
                      Wins
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ 
                    backgroundColor: 'rgba(255, 152, 0, 0.1)',
                    p: 2,
                    borderRadius: '12px',
                    textAlign: 'center'
                  }}>
                    <Typography variant="h4" color="warning.main" fontWeight="bold">
                      4.9
                    </Typography>
                    <Typography variant="body2">
                      Rating
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ 
                    backgroundColor: 'rgba(156, 39, 176, 0.1)',
                    p: 2,
                    borderRadius: '12px',
                    textAlign: 'center'
                  }}>
                    <Typography variant="h4" color="secondary" fontWeight="bold">
                      $1,250
                    </Typography>
                    <Typography variant="body2">
                      Saved
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Main Content */}
          <Grid item xs={12} md={8}>
            <Paper elevation={3} sx={{ 
              borderRadius: '16px',
              boxShadow: '0 8px 16px rgba(0,0,0,0.08)'
            }}>
              <Tabs
                value={activeTab}
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
                sx={{
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                  '& .MuiTab-root': {
                    textTransform: 'none',
                    fontWeight: 'bold',
                    minHeight: 60
                  }
                }}
              >
                <Tab label="Profile" icon={<Person />} iconPosition="start" />
                <Tab label="Bids" icon={<ShoppingCart />} iconPosition="start" />
                <Tab label="Wins" icon={<Star />} iconPosition="start" />
                <Tab label="Watchlist" icon={<Favorite />} iconPosition="start" />
                <Tab label="History" icon={<History />} iconPosition="start" />
              </Tabs>

              <Box sx={{ p: 4 }}>
                {activeTab === 0 && (
                  <Box>
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center', 
                      mb: 4 
                    }}>
                      <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                        Personal Information
                      </Typography>
                      {editMode && (
                        <Box>
                          <Button 
                            variant="contained" 
                            color="primary" 
                            startIcon={<Save />} 
                            onClick={handleSave}
                            sx={{ mr: 2, borderRadius: '12px' }}
                          >
                            Save Changes
                          </Button>
                          <Button 
                            variant="outlined" 
                            color="error" 
                            startIcon={<Cancel />} 
                            onClick={() => setEditMode(false)}
                            sx={{ borderRadius: '12px' }}
                          >
                            Cancel
                          </Button>
                        </Box>
                      )}
                    </Box>

                    <Grid container spacing={3}>
                      {/* Basic Info */}
                      <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle2" color="text.secondary">
                          First Name
                        </Typography>
                        <Typography variant="body1" sx={{ 
                          fontWeight: 'medium',
                          mb: 2
                        }}>
                          {user.firstName}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Last Name
                        </Typography>
                        <Typography variant="body1" sx={{ 
                          fontWeight: 'medium',
                          mb: 2
                        }}>
                          {user.lastName}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Email
                        </Typography>
                        <Typography variant="body1" sx={{ 
                          fontWeight: 'medium',
                          mb: 2
                        }}>
                          {user.email}
                        </Typography>
                      </Grid>

                      {/* Phone */}
                      <Grid item xs={12}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Phone Number
                        </Typography>
                        {editMode ? (
                          <TextField
                            fullWidth
                            variant="outlined"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="+1 (123) 456-7890"
                            size="small"
                            sx={{ mb: 2 }}
                          />
                        ) : (
                          <Typography variant="body1" sx={{ 
                            fontWeight: 'medium',
                            mb: 2
                          }}>
                            {user.phone || 'Not provided'}
                          </Typography>
                        )}
                      </Grid>

                      {/* Address */}
                      <Grid item xs={12}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Address
                        </Typography>
                        
                        {editMode ? (
                          <Grid container spacing={2} sx={{ mt: 1 }}>
                            <Grid item xs={12}>
                              <TextField
                                fullWidth
                                variant="outlined"
                                name="address.street"
                                label="Street Address"
                                value={formData.address.street}
                                onChange={handleInputChange}
                                size="small"
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                fullWidth
                                variant="outlined"
                                name="address.street2"
                                label="Apartment, Suite, etc. (Optional)"
                                value={formData.address.street2}
                                onChange={handleInputChange}
                                size="small"
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                fullWidth
                                variant="outlined"
                                name="address.city"
                                label="City"
                                value={formData.address.city}
                                onChange={handleInputChange}
                                size="small"
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                fullWidth
                                variant="outlined"
                                name="address.state"
                                label="State/Province"
                                value={formData.address.state}
                                onChange={handleInputChange}
                                size="small"
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                fullWidth
                                variant="outlined"
                                name="address.postalCode"
                                label="Postal Code"
                                value={formData.address.postalCode}
                                onChange={handleInputChange}
                                size="small"
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                fullWidth
                                variant="outlined"
                                name="address.country"
                                label="Country"
                                value={formData.address.country}
                                onChange={handleInputChange}
                                size="small"
                              />
                            </Grid>
                          </Grid>
                        ) : (
                          <Typography variant="body1" sx={{ 
                            fontWeight: 'medium',
                            mb: 2
                          }}>
                            {user.address?.street ? (
                              <>
                                {user.address.street}{user.address.street2 && `, ${user.address.street2}`}<br />
                                {user.address.city}, {user.address.state} {user.address.postalCode}<br />
                                {user.address.country}
                              </>
                            ) : 'Not provided'}
                          </Typography>
                        )}
                      </Grid>

                      {/* Account Info */}
                      <Grid item xs={12}>
                        <Divider sx={{ my: 2 }} />
                        <Typography variant="subtitle2" color="text.secondary">
                          Account Information
                        </Typography>
                        <Grid container spacing={2} sx={{ mt: 1 }}>
                          <Grid item xs={12} sm={6}>
                            <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                              <strong>Role:</strong> {user.role}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                              <strong>Member since:</strong> {formatDate(user.createdAt)}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                              <strong>Last updated:</strong> {formatDate(user.updatedAt)}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                              <strong>Status:</strong> <Chip label="Active" color="success" size="small" />
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>
                )}

                {activeTab === 1 && (
                  <Box>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
                      My Active Bids
                    </Typography>
                    <Grid container spacing={3}>
                      {[1, 2, 3].map((item) => (
                        <Grid item xs={12} key={item}>
                          <Card sx={{ 
                            display: 'flex', 
                            borderRadius: '12px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                            transition: 'transform 0.3s',
                            '&:hover': {
                              transform: 'translateY(-5px)'
                            }
                          }}>
                            <Box sx={{ 
                              width: 120, 
                              height: 120, 
                              backgroundColor: 'rgba(0,0,0,0.08)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}>
                              <LocalShipping sx={{ fontSize: 40, color: 'text.secondary' }} />
                            </Box>
                            <Box sx={{ 
                              flex: 1, 
                              display: 'flex', 
                              flexDirection: 'column',
                              p: 2
                            }}>
                              <Box sx={{ 
                                display: 'flex', 
                                justifyContent: 'space-between',
                                alignItems: 'center'
                              }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                  Product {item}
                                </Typography>
                                <Chip 
                                  label={`${Math.floor(Math.random() * 10) + 1}h left`} 
                                  color="error" 
                                  size="small"
                                />
                              </Box>
                              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                Current bid: ${(Math.random() * 50).toFixed(2)}
                              </Typography>
                              <Box sx={{ 
                                display: 'flex', 
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                mt: 'auto'
                              }}>
                                <Typography variant="body2">
                                  {Math.floor(Math.random() * 100) + 1} bids placed
                                </Typography>
                                <Button 
                                  variant="contained" 
                                  color="primary" 
                                  size="small"
                                  sx={{ 
                                    borderRadius: '12px',
                                    textTransform: 'none'
                                  }}
                                >
                                  Increase Bid
                                </Button>
                              </Box>
                            </Box>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                )}

                {activeTab === 2 && (
                  <Box>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
                      My Winning Bids
                    </Typography>
                    <Grid container spacing={3}>
                      {[1, 2].map((item) => (
                        <Grid item xs={12} sm={6} key={item}>
                          <Card sx={{ 
                            borderRadius: '12px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                            overflow: 'hidden'
                          }}>
                            <Box sx={{ 
                              height: 140,
                              backgroundColor: 'primary.light',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}>
                              <Star sx={{ fontSize: 60, color: 'primary.main' }} />
                            </Box>
                            <CardContent>
                              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                Won Product {item}
                              </Typography>
                              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                You saved ${(Math.random() * 500 + 100).toFixed(2)}!
                              </Typography>
                              <Box sx={{ 
                                display: 'flex', 
                                justifyContent: 'space-between',
                                mt: 2
                              }}>
                                <Chip 
                                  label="Shipped" 
                                  color="success" 
                                  size="small"
                                  variant="outlined"
                                />
                                <Button 
                                  variant="outlined" 
                                  color="primary" 
                                  size="small"
                                  sx={{ 
                                    borderRadius: '12px',
                                    textTransform: 'none'
                                  }}
                                >
                                  Track Order
                                </Button>
                              </Box>
                            </CardContent>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                )}

                {activeTab === 3 && (
                  <Box>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
                      My Watchlist
                    </Typography>
                    <Grid container spacing={3}>
                      {[1, 2, 3, 4].map((item) => (
                        <Grid item xs={12} sm={6} key={item}>
                          <Card sx={{ 
                            borderRadius: '12px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                            position: 'relative'
                          }}>
                            <Box sx={{ 
                              height: 120,
                              backgroundColor: 'rgba(0,0,0,0.08)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}>
                              <Favorite sx={{ 
                                fontSize: 40, 
                                color: 'error.main',
                                position: 'absolute',
                                top: 10,
                                right: 10
                              }} />
                              <Work sx={{ fontSize: 40, color: 'text.secondary' }} />
                            </Box>
                            <CardContent>
                              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                Watched Item {item}
                              </Typography>
                              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                Starting bid: ${(Math.random() * 20 + 1).toFixed(2)}
                              </Typography>
                              <Button 
                                fullWidth
                                variant="contained" 
                                color="primary" 
                                size="small"
                                sx={{ 
                                  mt: 2,
                                  borderRadius: '12px',
                                  textTransform: 'none'
                                }}
                              >
                                Place Bid
                              </Button>
                            </CardContent>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                )}

                {activeTab === 4 && (
                  <Box>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
                      Bidding History
                    </Typography>
                    <List sx={{ width: '100%' }}>
                      {[1, 2, 3, 4, 5].map((item) => (
                        <ListItem 
                          key={item} 
                          sx={{ 
                            px: 0,
                            borderBottom: '1px solid',
                            borderColor: 'divider'
                          }}
                        >
                          <ListItemAvatar>
                            <Avatar sx={{ bgcolor: 'primary.light' }}>
                              {item % 2 === 0 ? (
                                <Star sx={{ color: 'primary.dark' }} />
                              ) : (
                                <StarBorder sx={{ color: 'primary.dark' }} />
                              )}
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={`Bid on Product ${item}`}
                            secondary={`${formatDate(new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000))} • $${(Math.random() * 50).toFixed(2)}`}
                          />
                          <Chip 
                            label={item % 2 === 0 ? "Won" : "Lost"} 
                            color={item % 2 === 0 ? "success" : "default"} 
                            size="small"
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                )}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ProfilePage;