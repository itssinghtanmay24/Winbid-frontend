// pages/Products.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import {
  Container,
  Grid,
  Button,
  Fab,
  Box,
  Tooltip,
  Typography,
} from "@mui/material";
import productApi from "../services/productApi";
import ProductCard from "../components/ProductCard";

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // productApi.getAllProducts() already returns response.data
        const response = await productApi.getAllProducts();
        // Handle both cases: if response is an array or has a data property
        const data = Array.isArray(response) ? response : (response.data || response);

        if (!Array.isArray(data) || data.length === 0) {
          setProducts([]);
          setLoading(false);
          return;
        }

        const productsWithBidsAndWinner = await Promise.all(
          data.map(async (product) => {
            try {
              const completedBids = await productApi.getCompletedBids(
                product._id // Using _id instead of id
              );
              const winnerId = await productApi.getProductWinner(product._id);

              return {
                ...product,
                completedBids: completedBids,
                winnerId: winnerId,
              };
            } catch (err) {
              console.error(
                `Error fetching data for product ${product._id}:`,
                err
              );
              return {
                ...product,
                completedBids: 0,
                winnerId: null, // Changed from 0 to null for consistency
              };
            }
          })
        );

        setProducts(productsWithBidsAndWinner);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 5, textAlign: "center" }}>
        <Typography variant="h6">Loading products...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 5, textAlign: "center" }}>
        <Typography variant="h6" color="error">
          Error: {error}
        </Typography>
      </Container>
    );
  }

  const handleDelete = (productId) => {
    setProducts(prevProducts => prevProducts.filter(product => product._id !== productId));
  };

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Available Products
      </Typography>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item key={product._id} xs={12} sm={6} md={4}>
            <ProductCard product={product} onDelete={handleDelete} />
            
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Products;