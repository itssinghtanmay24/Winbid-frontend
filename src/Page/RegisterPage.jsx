import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Grid,
  CircularProgress,
  Link,
  Stepper,
  Step,
  StepLabel,
  Paper,
  Checkbox,
  FormControlLabel,
  LinearProgress,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff, CheckCircle, Error as ErrorIcon } from "@mui/icons-material";
import api from "../services/api";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    username: "",
    phoneNumber: "",
    acceptTerms: false,
  });
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    feedback: [],
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpTimer, setOtpTimer] = useState(0);
  const [otpSent, setOtpSent] = useState(false);
  const [registrationToken, setRegistrationToken] = useState(null);

  const steps = ["Personal Information", "Email Verification", "Complete Registration"];

  // Password strength checker
  const checkPasswordStrength = (password) => {
    let score = 0;
    const feedback = [];

    if (password.length >= 8) score += 1;
    else feedback.push("At least 8 characters");

    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 1;
    else feedback.push("Mix of uppercase and lowercase letters");

    if (/\d/.test(password)) score += 1;
    else feedback.push("At least one number");

    if (/[!@#$%^&*(),.?":{}|<>]/.test(password) || /[^a-zA-Z0-9]/.test(password)) {
      score += 1;
    } else {
      feedback.push("At least one special character");
    }

    if (password.length >= 12) score += 1;

    setPasswordStrength({ score, feedback });
  };

  useEffect(() => {
    if (formData.password) {
      checkPasswordStrength(formData.password);
    }
  }, [formData.password]);

  // OTP Timer
  useEffect(() => {
    if (otpTimer > 0) {
      const timer = setTimeout(() => setOtpTimer(otpTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [otpTimer]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    setError(null);
  };

  const validateStep1 = () => {
    if (!formData.firstName.trim()) {
      setError("First name is required");
      return false;
    }
    if (!formData.lastName.trim()) {
      setError("Last name is required");
      return false;
    }
    if (!formData.username.trim()) {
      setError("Username is required");
      return false;
    }
    if (formData.username.length < 3) {
      setError("Username must be at least 3 characters");
      return false;
    }
    if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      setError("Username can only contain letters, numbers, and underscores");
      return false;
    }
    if (!formData.email.trim()) {
      setError("Email is required");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Please enter a valid email address");
      return false;
    }
    if (!formData.phoneNumber.trim()) {
      setError("Phone number is required");
      return false;
    }
    if (!/^\+?[\d\s-()]+$/.test(formData.phoneNumber)) {
      setError("Please enter a valid phone number");
      return false;
    }
    if (!formData.password) {
      setError("Password is required");
      return false;
    }
    if (passwordStrength.score < 3) {
      setError("Password is too weak. Please improve it.");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    if (!formData.acceptTerms) {
      setError("Please accept the Terms & Conditions to continue");
      return false;
    }
    return true;
  };

  const handleNext = async () => {
    setError(null);
    
    if (activeStep === 0) {
      if (!validateStep1()) {
        return;
      }
      
      setLoading(true);
      try {
        // Step 1: Send registration data and request OTP
        const response = await api.post("/auth/register/initiate", {
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
          username: formData.username,
          phoneNumber: formData.phoneNumber,
        });

        if (response.data.success) {
          setRegistrationToken(response.data.registrationToken);
          setOtpSent(true);
          setOtpTimer(300); // 5 minutes
          setActiveStep(1);
        } else {
          setError(response.data.message || "Failed to initiate registration");
        }
      } catch (err) {
        console.error("Registration initiation error:", err);
        setError(
          err.response?.data?.message ||
          err.response?.data?.error ||
          "Failed to initiate registration. Please try again."
        );
      } finally {
        setLoading(false);
      }
    } else if (activeStep === 1) {
      // Step 2: Verify OTP
      if (!otp || otp.length !== 6) {
        setError("Please enter a valid 6-digit OTP");
        return;
      }

      setLoading(true);
      try {
        const response = await api.post("/auth/register/verify-otp", {
          email: formData.email,
          otp: otp,
          registrationToken: registrationToken,
        });

        if (response.data.success) {
          setActiveStep(2);
          setSuccess(true);
          // Auto redirect after 3 seconds
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        } else {
          setError(response.data.message || "Invalid OTP. Please try again.");
        }
      } catch (err) {
        console.error("OTP verification error:", err);
        setError(
          err.response?.data?.message ||
          err.response?.data?.error ||
          "OTP verification failed. Please try again."
        );
      } finally {
        setLoading(false);
      }
    }
  };

  const handleBack = () => {
    if (activeStep === 1) {
      setOtp("");
      setOtpSent(false);
      setOtpTimer(0);
      setRegistrationToken(null);
    }
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setError(null);
  };

  const handleResendOtp = async () => {
    setError(null);
    setLoading(true);
    try {
      const response = await api.post("/auth/register/resend-otp", {
        email: formData.email,
        registrationToken: registrationToken,
      });

      if (response.data.success) {
        setOtpTimer(300); // Reset timer to 5 minutes
        setOtp("");
        setError(null);
        // Show success message (you can use a snackbar here)
        alert("OTP resent successfully! Please check your email.");
      } else {
        setError(response.data.message || "Failed to resend OTP");
      }
    } catch (err) {
      console.error("Resend OTP error:", err);
      setError(
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to resend OTP. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength.score <= 2) return "error";
    if (passwordStrength.score === 3) return "warning";
    return "success";
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength.score <= 1) return "Very Weak";
    if (passwordStrength.score === 2) return "Weak";
    if (passwordStrength.score === 3) return "Fair";
    if (passwordStrength.score === 4) return "Good";
    return "Strong";
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                required
                id="firstName"
                label="First Name"
                name="firstName"
                autoComplete="given-name"
                value={formData.firstName}
                onChange={handleChange}
                error={error && !formData.firstName.trim()}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                required
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                value={formData.lastName}
                onChange={handleChange}
                error={error && !formData.lastName.trim()}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                value={formData.username}
                onChange={handleChange}
                error={error && (!formData.username.trim() || formData.username.length < 3)}
                helperText="3-20 characters, letters, numbers, and underscores only"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                id="email"
                label="Email Address"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                error={error && (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                id="phoneNumber"
                label="Phone Number"
                name="phoneNumber"
                type="tel"
                autoComplete="tel"
                value={formData.phoneNumber}
                onChange={handleChange}
                error={error && !formData.phoneNumber.trim()}
                helperText="Include country code (e.g., +1 234 567 8900)"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
                error={error && (!formData.password || passwordStrength.score < 3)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {formData.password && (
                <Box sx={{ mt: 1 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
                    <LinearProgress
                      variant="determinate"
                      value={(passwordStrength.score / 5) * 100}
                      color={getPasswordStrengthColor()}
                      sx={{ flexGrow: 1, mr: 1, height: 8, borderRadius: 1 }}
                    />
                    <Typography variant="caption" color={getPasswordStrengthColor() + ".main"}>
                      {getPasswordStrengthText()}
                    </Typography>
                  </Box>
                  {passwordStrength.feedback.length > 0 && (
                    <Typography variant="caption" color="text.secondary">
                      {passwordStrength.feedback.join(", ")}
                    </Typography>
                  )}
                </Box>
              )}
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                name="confirmPassword"
                label="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={error && formData.password !== formData.confirmPassword}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        edge="end"
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {formData.confirmPassword && formData.password === formData.confirmPassword && (
                <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                  <CheckCircle color="success" sx={{ fontSize: 16, mr: 0.5 }} />
                  <Typography variant="caption" color="success.main">
                    Passwords match
                  </Typography>
                </Box>
              )}
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.acceptTerms}
                    onChange={handleChange}
                    name="acceptTerms"
                    required
                  />
                }
                label={
                  <Typography variant="body2">
                    I agree to the{" "}
                    <Link href="/terms" target="_blank" sx={{ fontWeight: "bold" }}>
                      Terms & Conditions
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" target="_blank" sx={{ fontWeight: "bold" }}>
                      Privacy Policy
                    </Link>
                  </Typography>
                }
              />
            </Grid>
          </Grid>
        );

      case 1:
        return (
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h6" gutterBottom>
              Verify Your Email
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              We've sent a 6-digit verification code to <strong>{formData.email}</strong>
              <br />
              Please enter the code below to complete your registration.
            </Typography>

            <TextField
              fullWidth
              required
              id="otp"
              label="Enter OTP"
              name="otp"
              value={otp}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "").slice(0, 6);
                setOtp(value);
                setError(null);
              }}
              inputProps={{
                maxLength: 6,
                style: {
                  textAlign: "center",
                  fontSize: "1.5rem",
                  letterSpacing: "0.5rem",
                },
              }}
              error={error && (!otp || otp.length !== 6)}
              sx={{ mb: 2 }}
            />

            <Box sx={{ mb: 2 }}>
              {otpTimer > 0 ? (
                <Typography variant="body2" color="text.secondary">
                  Resend OTP in {Math.floor(otpTimer / 60)}:
                  {String(otpTimer % 60).padStart(2, "0")}
                </Typography>
              ) : (
                <Button
                  variant="text"
                  size="small"
                  onClick={handleResendOtp}
                  disabled={loading}
                >
                  Resend OTP
                </Button>
              )}
            </Box>

            <Typography variant="caption" color="text.secondary">
              Didn't receive the code? Check your spam folder or click "Resend OTP"
            </Typography>
          </Box>
        );

      case 2:
        return (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <CheckCircle color="success" sx={{ fontSize: 80, mb: 2 }} />
            <Typography variant="h5" gutterBottom color="success.main">
              Registration Successful!
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Your account has been created successfully.
              <br />
              Redirecting to login page...
            </Typography>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={10}>
          <Paper
            elevation={3}
            sx={{
              p: { xs: 3, md: 4 },
              borderRadius: 2,
            }}
          >
            <Typography
              variant="h4"
              gutterBottom
              sx={{ fontWeight: "bold", textAlign: "center", mb: 1 }}
            >
              Create an Account
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              gutterBottom
              sx={{ mb: 4, textAlign: "center" }}
            >
              Join WinBid and start bidding on amazing products!
            </Typography>

            <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            {error && (
              <Alert
                severity="error"
                sx={{ mb: 3 }}
                onClose={() => setError(null)}
                icon={<ErrorIcon />}
              >
                {error}
              </Alert>
            )}

            {success && activeStep === 2 && (
              <Alert severity="success" sx={{ mb: 3 }}>
                Registration successful! Redirecting to login...
              </Alert>
            )}

            <Box component="form" noValidate sx={{ mt: 2 }}>
              {renderStepContent()}

              <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
                <Button
                  disabled={activeStep === 0 || loading}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />
                {activeStep < steps.length - 1 ? (
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    disabled={loading}
                    sx={{ minWidth: 120 }}
                  >
                    {loading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : activeStep === 0 ? (
                      "Send OTP"
                    ) : (
                      "Verify & Register"
                    )}
                  </Button>
                ) : null}
              </Box>
            </Box>

            {activeStep === 0 && (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 3, textAlign: "center" }}>
                Already have an account?{" "}
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => navigate("/login")}
                  sx={{
                    fontWeight: "bold",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  Sign In
                </Link>
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default RegisterPage;
