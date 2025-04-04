import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, Typography, TextField, Button, Box, Avatar, 
  Tab, Tabs, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, CircularProgress, Alert,
  Snackbar
} from '@mui/material';
import api from '../services/api';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editedUser, setEditedUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  const navigate = useNavigate();
  const { user: authUser, logout } = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // First check authentication
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        // Then fetch fresh data from API
        const response = await api.get('/users/profile');
        
        if (response.data) {
          // Destructure the backend response format
          const { user: userData, bids: userBids = [] } = response.data;
          
          setUser(userData);
          setEditedUser(userData);
          setBids(userBids);
        }
      } catch (err) {
        console.error("Profile fetch error:", err);
        
        if (err.response?.status === 401) {
          logout();
          navigate('/login');
        } else {
          setError(err.response?.data?.message || 
                  err.message || 
                  'Failed to load profile data');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate, logout]);

  const handleEdit = () => setIsEditing(true);

  const handleSave = async () => {
    try {
      setLoading(true);
      const response = await api.put(`/users/${user.email}`, editedUser);
      
      setUser(response.data);
      setEditedUser(response.data);
      setIsEditing(false);
      
      setSnackbar({
        open: true,
        message: 'Profile updated successfully!',
        severity: 'success'
      });
    } catch (err) {
      console.error("Update error:", err);
      setSnackbar({
        open: true,
        message: err.response?.data?.message || 'Failed to update profile',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditedUser(user);
    setIsEditing(false);
    setError(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser(prev => ({ ...prev, [name]: value }));
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  if (loading && !user) {
    return (
      <Container maxWidth="md" sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        height: '80vh'
      }}>
        <CircularProgress size={60} />
      </Container>
    );
  }

  if (error && !user) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Button 
          variant="contained" 
          onClick={() => navigate('/login')}
        >
          Go to Login
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {user && (
        <>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            <Avatar 
              src={user.avatar} 
              alt={`${user.firstName} ${user.lastName}`}
              sx={{ 
                width: 100, 
                height: 100, 
                mr: 3,
                fontSize: '2.5rem',
                bgcolor: 'primary.main'
              }}
            >
              {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
            </Avatar>
            <Box>
              <Typography variant="h4">
                {user.firstName} {user.lastName}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {user.email}
              </Typography>
            </Box>
          </Box>

          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            sx={{ mb: 3 }}
            variant="fullWidth"
          >
            <Tab label="Profile Details" />
            <Tab label="My Bids" />
          </Tabs>

          {tabValue === 0 ? (
            <Box component="form" sx={{ mt: 2 }}>
              <TextField
                label="First Name"
                name="firstName"
                value={editedUser?.firstName || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
                disabled={!isEditing}
              />
              <TextField
                label="Last Name"
                name="lastName"
                value={editedUser?.lastName || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
                disabled={!isEditing}
              />
              <TextField
                label="Email"
                name="email"
                value={editedUser?.email || ''}
                fullWidth
                margin="normal"
                disabled
              />

              {isEditing ? (
                <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                  <Button 
                    variant="contained" 
                    onClick={handleSave}
                    size="large"
                    disabled={loading}
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </Button>
                  <Button 
                    variant="outlined" 
                    onClick={handleCancel}
                    size="large"
                  >
                    Cancel
                  </Button>
                </Box>
              ) : (
                <Button 
                  variant="contained" 
                  onClick={handleEdit}
                  sx={{ mt: 2 }}
                  size="large"
                >
                  Edit Profile
                </Button>
              )}
            </Box>
          ) : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell>Bid Amount</TableCell>
                    <TableCell>Bid Time</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {bids.length > 0 ? (
                    bids.map((bid) => (
                      <TableRow key={bid.id}>
                        <TableCell>
                          <Button 
                            onClick={() => navigate(`/products/${bid.product?.id}`)}
                            sx={{ textTransform: 'none' }}
                          >
                            {bid.product?.name || 'Unknown Product'}
                          </Button>
                        </TableCell>
                        <TableCell>${bid.amount?.toFixed(2)}</TableCell>
                        <TableCell>
                          {new Date(bid.bidTime).toLocaleString()}
                        </TableCell>
                        <TableCell>
                          {bid.isWinning ? (
                            <Typography color="success.main">Winning</Typography>
                          ) : (
                            <Typography color="error.main">Outbid</Typography>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} align="center">
                        <Typography variant="body1" sx={{ py: 2 }}>
                          You haven't placed any bids yet
                        </Typography>
                        <Button 
                          variant="outlined" 
                          onClick={() => navigate('/products')}
                        >
                          Browse Products
                        </Button>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </>
      )}
    </Container>
  );
};

export default Profile;