import api from "./api";

const productApi = {
  getAllProducts: async () => {
    try {
      const response = await api.get("/products");
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  },
  getAllRoles: async () => {
    try {
      const response = await api.get("users/role/17");
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  },

  getProductById: async (id) => {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error);
      throw error;
    }
  },

  getCompletedBids: async (id) => {
    try {
      const response = await api.get(`/products/bid/${id}`);
      return response.data.count || 0; // Ensure we return only the integer count
    } catch (error) {
      console.error(`Error fetching completed bids for product ${id}:`, error);
      throw error;
    }
  },

  createProduct: async (productData) => {
    try {
      const response = await api.post("/products", productData);
      return response.data;
    } catch (error) {
      let errorMessage = "Failed to create product";
      if (error.response) {
        errorMessage = error.response.data.message || errorMessage;
      } else if (error.request) {
        errorMessage = "No response from server";
      } else {
        errorMessage = error.message;
      }
      console.error(errorMessage);
      throw new Error(errorMessage);
    }
  },

  updateProduct: async (id, productData) => {
    try {
      const response = await api.put(`/products/${id}`, productData);
      return response.data;
    } catch (error) {
      console.error(`Error updating product ${id}:`, error);
      throw error;
    }
  },

  deleteProduct: async (id) => {
    try {
      await api.delete(`/products/${id}`);
    } catch (error) {
      console.error(`Error deleting product ${id}:`, error);
      throw error;
    }
  },
  // Add this to your productApi.js
  getProductWinner: async (id) => {
    try {
      const response = await api.get(`/products/winner/${id}`);
      return response.data; // This should return the winner's userId (or 0 if no winner)
    } catch (error) {
      console.error(`Error fetching winner for product ${id}:`, error);
      throw error;
    }
  },
};

export default productApi;
