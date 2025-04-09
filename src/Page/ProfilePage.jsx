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
  Snackbar
} from '@mui/material';
import { Email, Person, Phone, Home, Edit, Save, Cancel } from '@mui/icons-material';
import productApi from '../services/productApi';

const ProfilePage = () => {
  const { Id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
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
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress size={60} />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 4, textAlign: 'center' }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!user) {
    return (
      <Container maxWidth="md" sx={{ py: 4, textAlign: 'center' }}>
        <Typography variant="h6">User not found</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
      >
        <Alert 
          severity={snackbar.severity} 
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      <Paper elevation={3} sx={{ p: 4 }}>
        <Grid container spacing={4}>
          {/* Avatar Section */}
          <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar sx={{ 
              width: 120, 
              height: 120, 
              fontSize: 48,
              mb: 2,
              bgcolor: 'primary.main'
            }}>
              {user.firstName.charAt(0)}{user.lastName.charAt(0)}
            </Avatar>
            <Typography variant="h5" component="h1" align="center">
              {user.firstName} {user.lastName}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" align="center">
              @{user.username}
            </Typography>
          </Grid>

          {/* Details Section */}
          <Grid item xs={12} md={8}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6">Profile Information</Typography>
              {editMode ? (
                <Box>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    startIcon={<Save />} 
                    onClick={handleSave}
                    sx={{ mr: 2 }}
                  >
                    Save
                  </Button>
                  <Button 
                    variant="outlined" 
                    color="error" 
                    startIcon={<Cancel />} 
                    onClick={() => setEditMode(false)}
                  >
                    Cancel
                  </Button>
                </Box>
              ) : (
                <Button 
                  variant="contained" 
                  color="primary" 
                  startIcon={<Edit />} 
                  onClick={() => setEditMode(true)}
                >
                  Edit
                </Button>
              )}
            </Box>

            <Grid container spacing={2}>
              {/* Basic Info (read-only) */}
              <Grid item xs={12} sm={6}>
                <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
                  <Person sx={{ mr: 1, color: 'action.active' }} />
                  <strong>First Name:</strong> {user.firstName}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">
                  <strong>Last Name:</strong> {user.lastName}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
                  <Email sx={{ mr: 1, color: 'action.active' }} />
                  <strong>Email:</strong> {user.email}
                </Typography>
              </Grid>

              {/* Editable Phone */}
              <Grid item xs={12}>
                <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Phone sx={{ mr: 1, color: 'action.active' }} />
                  <strong>Phone:</strong>
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
                  />
                ) : (
                  <Typography variant="body1">
                    {user.phone || 'Not provided'}
                  </Typography>
                )}
              </Grid>

              {/* Address Section */}
              <Grid item xs={12}>
                <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Home sx={{ mr: 1, color: 'action.active' }} />
                  <strong>Address:</strong>
                </Typography>
                
                {editMode ? (
                  <Grid container spacing={2}>
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
                  <Typography variant="body1">
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

              {/* Read-only Info */}
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">
                  <strong>Role:</strong> {user.role}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">
                  <strong>Bids Placed:</strong> {user.bids?.length || 0}
                </Typography>
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">
                  <strong>Member since:</strong> {formatDate(user.createdAt)}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">
                  <strong>Last updated:</strong> {formatDate(user.updatedAt)}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default ProfilePage;