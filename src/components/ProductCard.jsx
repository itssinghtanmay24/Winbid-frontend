import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  IconButton,
  Chip,
  Stack,
  useTheme,
  Badge
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  Delete,
  FavoriteBorder,
  Favorite,
  LocalOffer,
  Timer,
  CheckCircle,
  Person
} from "@mui/icons-material";
import api from "../services/api";

const ProductCard = ({ product, onDelete }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isBiddingClosed = product.isClosed || product.winner;
  const [isFavorite, setIsFavorite] = React.useState(false);

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
      onDelete(product._id);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const toggleFavorite = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <Card
      sx={{
        cursor: "pointer",
        transition: "all 0.3s ease",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
        boxShadow: theme.shadows[2],
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: theme.shadows[6],
          '& .product-image': {
            transform: "scale(1.05)"
          }
        },
        position: "relative",
        overflow: "hidden"
      }}
      onClick={handleCardClick}
    >
      {/* Top action buttons */}
      <Box sx={{
        position: "absolute",
        top: 8,
        right: 8,
        zIndex: 2,
        display: "flex",
        gap: 1
      }}>
        <IconButton
          onClick={toggleFavorite}
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
            }
          }}
          aria-label="favorite"
        >
          {isFavorite ? 
            <Favorite color="error" /> : 
            <FavoriteBorder color="disabled" />}
        </IconButton>
        <IconButton
          onClick={handleDelete}
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            '&:hover': {
              backgroundColor: 'rgba(255, 0, 0, 0.2)',
            }
          }}
          aria-label="delete"
        >
          <Delete color="error" />
        </IconButton>
      </Box>

      {/* Product image with status overlay */}
      <Box sx={{
        position: "relative",
        overflow: "hidden",
        height: 200,
        backgroundColor: theme.palette.grey[100]
      }}>
        <CardMedia
          component="img"
          height="100%"
          image={product.imageUrl || "https://via.placeholder.com/300x200?text=No+Image"}
          alt={product.name}
          className="product-image"
          sx={{
            objectFit: "cover",
            transition: "transform 0.5s ease",
            filter: isBiddingClosed ? "grayscale(50%)" : "none",
            opacity: isBiddingClosed ? 0.8 : 1,
          }}
        />
        {isBiddingClosed && (
          <Chip
            label={product.winner ? `Winner Selected` : "Bidding Closed"}
            color="error"
            size="small"
            sx={{
              position: "absolute",
              top: 8,
              left: 8,
              fontWeight: 600,
              boxShadow: theme.shadows[2]
            }}
            icon={product.winner ? <Person /> : <Timer />}
          />
        )}
        <Chip
          label={`₹${product.bidPrice}`}
          color="primary"
          size="medium"
          sx={{
            position: "absolute",
            bottom: 16,
            left: 16,
            fontWeight: 700,
            fontSize: "1rem",
            boxShadow: theme.shadows[2],
            '& .MuiChip-label': {
              px: 1.5
            }
          }}
          icon={<LocalOffer fontSize="small" />}
        />
      </Box>

      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 600,
            mb: 1,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
          }}
        >
          {product.name}
        </Typography>
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ 
            mb: 2,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden"
          }}
        >
          {product.description}
        </Typography>

        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
          <Chip
            label={`${product.currentBidCount || 0}/${product.totalBids} Bids`}
            color="info"
            size="small"
            variant="outlined"
          />
          <Chip
            label={isBiddingClosed ? "Completed" : "Active"}
            color={isBiddingClosed ? "default" : "success"}
            size="small"
            icon={isBiddingClosed ? <CheckCircle fontSize="small" /> : null}
          />
        </Stack>

        <Button
          fullWidth
          variant="contained"
          color="primary"
          size="medium"
          onClick={handleBidClick}
          disabled={isBiddingClosed}
          sx={{
            mt: "auto",
            py: 1.5,
            borderRadius: 2,
            fontWeight: 600,
            textTransform: "none",
            fontSize: "1rem",
            boxShadow: 'none',
            '&:hover': {
              boxShadow: theme.shadows[2],
              transform: "translateY(-1px)"
            },
            '&:disabled': {
              backgroundColor: theme.palette.grey[400],
              color: theme.palette.grey[600]
            }
          }}
        >
          {isBiddingClosed ? "Bidding Closed" : "Place Bid Now"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;