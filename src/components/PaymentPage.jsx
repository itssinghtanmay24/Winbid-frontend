import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  Button, 
  TextField, 
  Checkbox, 
  FormControlLabel, 
  Box,
  Radio,
  RadioGroup,
  Divider,
  Alert,
  IconButton,
  Collapse
} from "@mui/material";
import { FaCheckCircle, FaQrcode, FaTimes } from "react-icons/fa";
import { SiVisa, SiMastercard, SiAmericanexpress } from "react-icons/si";
import { BsBank } from "react-icons/bs";
import { RiWallet3Line } from "react-icons/ri";
import { MdPayment } from "react-icons/md";

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [upiOption, setUpiOption] = useState("qr");
  const [countdown, setCountdown] = useState(300); // 5 minutes in seconds
  const [cardType, setCardType] = useState("visa");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [error, setError] = useState(null);
  const { state } = useLocation();
  const navigate = useNavigate();
  
  // Enhanced product data handling with better defaults
  const product = state?.product ? {
    name: state.product.name || "Product Name",
    description: state.product.description || "Product description not available",
    bidPrice: state.product.bidPrice || state.product.currentBid || 0,
    originalPrice: state.product.originalPrice || (state.product.bidPrice ? state.product.bidPrice * 2 : 0),
    imageUrl: state.product.imageUrl || "https://via.placeholder.com/400x200.png?text=Product+Image",
    totalBids: state.product.totalBids || state.product.bidCount || 0,
    createdAt: state.product.createdAt || new Date().toISOString(),
    id: state.product.id || null
  } : {
    name: "Product Name",
    description: "Product description not available",
    bidPrice: 0,
    originalPrice: 0,
    imageUrl: "https://via.placeholder.com/400x200.png?text=Product+Image",
    totalBids: 0,
    createdAt: new Date().toISOString(),
    id: null
  };

  // Calculate order values with safeguards
  const discount = product.originalPrice > product.bidPrice 
    ? product.originalPrice - product.bidPrice 
    : 0;
  const discountPercentage = product.originalPrice > 0 
    ? Math.round((discount / product.originalPrice) * 100)
    : 0;

  // Countdown timer effect
  useEffect(() => {
    if (countdown > 0 && paymentMethod === "upi" && upiOption === "qr") {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setError("QR code expired. Please generate a new one.");
    }
  }, [countdown, paymentMethod, upiOption]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const handlePaymentSubmit = () => {
    if (!termsAccepted) {
      setError("Please accept the terms and conditions");
      return;
    }

    // Simulate payment processing
    setError(null);
    setTimeout(() => {
      setPaymentSuccess(true);
      // In a real app, you would redirect to success page or show success message
    }, 1500);
  };

  const generateNewQRCode = () => {
    setCountdown(300);
    setError(null);
    // In a real app, you would generate a new QR code from your backend
  };

  const renderUPIOptions = () => (
    <Box mt={1} pl={4}>
      <Typography variant="body2" gutterBottom>
        How would you like to use UPI?
      </Typography>
      <RadioGroup 
        value={upiOption} 
        onChange={(e) => setUpiOption(e.target.value)}
        sx={{ mb: 2 }}
      >
        <FormControlLabel 
          value="qr" 
          control={<Radio />} 
          label="QR code" 
        />
        <FormControlLabel 
          value="id" 
          control={<Radio />} 
          label="Enter UPI ID" 
        />
      </RadioGroup>

      {upiOption === "qr" ? (
        <Box textAlign="center">
          <Typography variant="body1" gutterBottom>
            Scan the QR code using your preferred UPI app to complete the payment
          </Typography>
          <Box 
            sx={{ 
              width: 200, 
              height: 200, 
              bgcolor: "grey.200", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center",
              mx: "auto",
              my: 2
            }}
          >
            <FaQrcode size={80} color="#555" />
          </Box>
          <Typography variant="body1" color={countdown < 60 ? "error.main" : "text.primary"}>
            You have {formatTime(countdown)} to pay
          </Typography>
          <Button 
            variant="outlined" 
            fullWidth 
            sx={{ mt: 2 }}
            onClick={generateNewQRCode}
            startIcon={<FaQrcode />}
          >
            Generate New QR Code
          </Button>
        </Box>
      ) : (
        <Box>
          <TextField 
            fullWidth 
            label="Enter UPI ID" 
            variant="outlined" 
            margin="normal"
            placeholder="username@upi"
            required
          />
          <Button 
            variant="contained" 
            fullWidth 
            sx={{ mt: 1 }}
            onClick={() => alert("Payment request sent to your UPI ID")}
            startIcon={<MdPayment />}
          >
            Request Payment
          </Button>
        </Box>
      )}
    </Box>
  );

  const renderCardOptions = () => (
    <Box mt={1} pl={4}>
      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
        <Button 
          variant={cardType === "visa" ? "contained" : "outlined"} 
          startIcon={<SiVisa />}
          onClick={() => setCardType("visa")}
        >
          VISA
        </Button>
        <Button 
          variant={cardType === "mastercard" ? "contained" : "outlined"} 
          startIcon={<SiMastercard />}
          onClick={() => setCardType("mastercard")}
        >
          Mastercard
        </Button>
        <Button 
          variant={cardType === "amex" ? "contained" : "outlined"} 
          startIcon={<SiAmericanexpress />}
          onClick={() => setCardType("amex")}
        >
          Amex
        </Button>
      </Box>
      <TextField 
        fullWidth 
        label="Card Number" 
        variant="outlined" 
        margin="normal"
        placeholder="1234 5678 9012 3456"
        required
        inputProps={{ maxLength: 19 }}
      />
      <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
        <TextField 
          fullWidth 
          label="Expiry Date" 
          variant="outlined" 
          placeholder="MM/YY"
          required
          inputProps={{ maxLength: 5 }}
        />
        <TextField 
          fullWidth 
          label="CVV" 
          variant="outlined" 
          placeholder={cardType === "amex" ? "4 digits" : "3 digits"}
          required
          inputProps={{ maxLength: cardType === "amex" ? 4 : 3 }}
        />
      </Box>
      <TextField 
        fullWidth 
        label="Cardholder Name" 
        variant="outlined" 
        margin="normal"
        required
      />
    </Box>
  );

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Typography variant="h4" textAlign="center" gutterBottom sx={{ mb: 4 }}>
        Secure Checkout
      </Typography>

      {paymentSuccess ? (
        <Box textAlign="center" sx={{ my: 10 }}>
          <FaCheckCircle size={60} color="green" />
          <Typography variant="h5" sx={{ mt: 2 }}>
            Payment Successful!
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Thank you for your purchase of "{product.name}"
          </Typography>
          <Button 
            variant="contained" 
            sx={{ mt: 4 }}
            onClick={() => navigate('/')}
          >
            Back to Home
          </Button>
        </Box>
      ) : (
        <>
          <Collapse in={!!error}>
            <Alert 
              severity="error" 
              sx={{ mb: 3 }}
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => setError(null)}
                >
                  <FaTimes />
                </IconButton>
              }
            >
              {error}
            </Alert>
          </Collapse>

          <Grid container spacing={4}>
            {/* Left Section - Order Summary */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Order Summary
                  </Typography>
                  
                  <Box>
                    <Typography variant="body1">
                      {/* Original Price: ₹{product.originalPrice.toLocaleString()} */}
                    </Typography>
                    <Typography variant="body1" color="success.main">
                      {/* Discount ({discountPercentage}% Off): -₹{discount.toLocaleString()} */}
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="h6">
                      Bid Amount: ₹{product.bidPrice.toLocaleString()}
                    </Typography>
                  </Box>

                  <Box mt={3}>
                    <FormControlLabel 
                      control={
                        <Checkbox 
                          checked={termsAccepted}
                          onChange={(e) => setTermsAccepted(e.target.checked)}
                          required 
                        />
                      } 
                      label="I agree to the Terms of Use and Privacy Policy" 
                    />
                  </Box>

                  <Box mt={3} textAlign="center">
                    <Typography variant="body1" color="text.secondary">
                      <FaCheckCircle color="green" /> 30-Day Money-Back Guarantee
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      Not satisfied? Get a full refund within 30 days.
                    </Typography>
                  </Box>

                  <Box mt={3} p={2} bgcolor="background.paper" borderRadius={1}>
                    <Typography variant="body2" color="text.secondary">
                      ⚡ Instant Access After Payment
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      Join {product.totalBids}+ learners who've enrolled in this course.
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Right Section - Payment Form */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Payment Method
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    <FaCheckCircle color="green" size={14} /> Secure and encrypted payment
                  </Typography>

                  <RadioGroup 
                    value={paymentMethod} 
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  >
                    {/* UPI Option */}
                    <Box 
                      sx={{ 
                        border: "1px solid", 
                        borderColor: paymentMethod === "upi" ? "primary.main" : "grey.300", 
                        borderRadius: 1, 
                        p: 2, 
                        mb: 2 
                      }}
                    >
                      <FormControlLabel 
                        value="upi" 
                        control={<Radio />} 
                        label={
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <img 
                              src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/UPI-Logo-vector.svg/1200px-UPI-Logo-vector.svg.png" 
                              alt="UPI" 
                              style={{ height: 20, marginRight: 8 }} 
                            />
                            UPI
                          </Box>
                        } 
                      />
                      {paymentMethod === "upi" && renderUPIOptions()}
                    </Box>

                    {/* Cards Option */}
                    <Box 
                      sx={{ 
                        border: "1px solid", 
                        borderColor: paymentMethod === "cards" ? "primary.main" : "grey.300", 
                        borderRadius: 1, 
                        p: 2, 
                        mb: 2 
                      }}
                    >
                      <FormControlLabel 
                        value="cards" 
                        control={<Radio />} 
                        label="Credit/Debit Cards" 
                      />
                      {paymentMethod === "cards" && renderCardOptions()}
                    </Box>

                    {/* Net Banking Option */}
                    <Box 
                      sx={{ 
                        border: "1px solid", 
                        borderColor: paymentMethod === "netbanking" ? "primary.main" : "grey.300", 
                        borderRadius: 1, 
                        p: 2, 
                        mb: 2 
                      }}
                    >
                      <FormControlLabel 
                        value="netbanking" 
                        control={<Radio />} 
                        label={
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <BsBank style={{ marginRight: 8 }} />
                            Net Banking
                          </Box>
                        } 
                      />
                      {paymentMethod === "netbanking" && (
                        <Box mt={1} pl={4}>
                          <TextField
                            select
                            fullWidth
                            label="Select Bank"
                            variant="outlined"
                            margin="normal"
                            SelectProps={{ native: true }}
                          >
                            <option value="">Select your bank</option>
                            <option value="sbi">State Bank of India</option>
                            <option value="hdfc">HDFC Bank</option>
                            <option value="icici">ICICI Bank</option>
                            <option value="axis">Axis Bank</option>
                          </TextField>
                        </Box>
                      )}
                    </Box>

                    {/* Wallets Option */}
                    <Box 
                      sx={{ 
                        border: "1px solid", 
                        borderColor: paymentMethod === "wallets" ? "primary.main" : "grey.300", 
                        borderRadius: 1, 
                        p: 2, 
                        mb: 2 
                      }}
                    >
                      <FormControlLabel 
                        value="wallets" 
                        control={<Radio />} 
                        label={
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <RiWallet3Line style={{ marginRight: 8 }} />
                            Mobile Wallets
                          </Box>
                        } 
                      />
                      {paymentMethod === "wallets" && (
                        <Box mt={1} pl={4}>
                          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                            <Button variant="outlined">Paytm</Button>
                            <Button variant="outlined">PhonePe</Button>
                            <Button variant="outlined">Google Pay</Button>
                            <Button variant="outlined">Amazon Pay</Button>
                          </Box>
                        </Box>
                      )}
                    </Box>
                  </RadioGroup>

                  <Button 
                    variant="contained" 
                    color="primary" 
                    fullWidth 
                    size="large"
                    onClick={handlePaymentSubmit}
                    disabled={(paymentMethod === "upi" && upiOption === "qr") || !termsAccepted}
                    sx={{ mt: 2 }}
                    startIcon={<MdPayment />}
                  >
                    {paymentMethod === "upi" && upiOption === "qr" ? "Waiting for payment..." : `Pay ₹${product.bidPrice.toLocaleString()}`}
                  </Button>

                  <Typography variant="body2" color="text.secondary" sx={{ mt: 2, textAlign: 'center' }}>
                    <FaCheckCircle color="green" size={14} /> 100% Secure Payments
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </>
      )}
    </Container>
  );
};

export default PaymentPage;