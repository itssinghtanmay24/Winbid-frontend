import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import api from "../services/api";

const ProductCard = ({ product, onDelete }) => {
  const navigate = useNavigate();
  const isBiddingClosed = product.isClosed || product.winner;

  const handleCardClick = () => {
    navigate(`/products/${product._id}`, { state: { product } });
  };

  const handleBidClick = (e) => {
    e.stopPropagation();
    navigate(`/payment`, { state: { product } });
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    try {
      await api.delete(`/products/${product._id}`);
      onDelete(product._id); // Call the parent component's delete handler
    } catch (error) {
      console.error("Error deleting product:", error);
      // You might want to add error handling here (e.g., show a snackbar/alert)
    }
  };

  return (
    <Card
      sx={{
        cursor: "pointer",
        transition: "transform 0.2s",
        "&:hover": {
          transform: "scale(1.02)",
        },
        position: "relative", // Added for positioning the delete button
      }}
      onClick={handleCardClick}
    >
      {/* Delete button positioned at top-right */}
      <IconButton
        onClick={handleDelete}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          zIndex: 2,
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          '&:hover': {
            backgroundColor: 'rgba(255, 0, 0, 0.7)',
          }
        }}
        aria-label="delete"
      >
        <DeleteIcon color="error" />
      </IconButton>

      <Box position="relative">
        <CardMedia
          component="img"
          height="150"
          image={product.imageUrl || "https://via.placeholder.com/150"}
          alt={product.name}
          sx={{
            filter: isBiddingClosed ? "grayscale(100%)" : "none",
            opacity: isBiddingClosed ? 0.7 : 1,
          }}
        />
        {isBiddingClosed && (
          <Box
            position="absolute"
            top="50%"
            left="50%"
            sx={{
              transform: "translate(-50%, -50%)",
              backgroundColor: "rgba(218, 54, 25, 0.7)",
              color: "white",
              padding: "5px 10px",
              borderRadius: "4px",
            }}
          >
            <Typography variant="subtitle2">
              {product.winner ? `Winner: User ${product.winner}` : "Bidding Closed"}
            </Typography>
          </Box>
        )}
      </Box>
      <CardContent>
        <Typography variant="h6">{product.name}</Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          {product.description}
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          Current Price: ₹{product.bidPrice}
        </Typography>
        <Box>
          <Typography variant="body2" align="center" sx={{ mt: 1 }}>
            {product.currentBidCount || 0} / {product.totalBids} Bids
          </Typography>
          <Typography variant="caption" display="block" align="center">
            {isBiddingClosed ? "Bidding completed" : "Bidding active"}
          </Typography>
        </Box>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={handleBidClick}
          disabled={isBiddingClosed}
        >
          {isBiddingClosed ? "Bidding Closed" : "Place Bid"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;