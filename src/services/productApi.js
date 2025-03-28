import api from "./api";

const productApi = {
  getAllProducts: async () => {
    try {
      const response = await api.get("/products");
      return response.data;
    } catch (error) {
      throw handleApiError(error, "Error fetching products");
    }
  },

  getAllRoles: async () => {
    try {
      const response = await api.get("/users/role/17");
      return response.data;
    } catch (error) {
      throw handleApiError(error, "Error fetching roles");
    }
  },

  getProductById: async (id) => {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error, `Error fetching product ${id}`);
    }
  },

  getCompletedBids: async (id) => {
    try {
      const response = await api.get(`/products/bid/${id}`);
      return response.data.count || 0;
    } catch (error) {
      throw handleApiError(error, `Error fetching completed bids for product ${id}`);
    }
  },

  createProduct: async (productData) => {
    try {
      // Ensure admin object is properly structured
      const formattedData = {
        ...productData,
        admin: { id: productData.adminId } // Transform adminId to admin object
      };
      
      const response = await api.post("/products", formattedData);
      return response.data;
    } catch (error) {
      throw handleApiError(error, "Failed to create product");
    }
  },

  updateProduct: async (id, productData) => {
    try {
      const response = await api.put(`/products/${id}`, productData);
      return response.data;
    } catch (error) {
      throw handleApiError(error, `Error updating product ${id}`);
    }
  },

  deleteProduct: async (id) => {
    try {
      await api.delete(`/products/${id}`);
    } catch (error) {
      throw handleApiError(error, `Error deleting product ${id}`);
    }
  },

  getProductWinner: async (id) => {
    try {
      const response = await api.get(`/products/winner/${id}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error, `Error fetching winner for product ${id}`);
    }
  },
};

// Helper function for consistent error handling
function handleApiError(error, defaultMessage) {
  let errorMessage = defaultMessage;
  
  if (error.response) {
    // Server responded with error status (4xx, 5xx)
    errorMessage = error.response.data?.message || 
                  error.response.data?.error || 
                  defaultMessage;
  } else if (error.request) {
    // Request was made but no response received
    errorMessage = "No response from server";
  }
  
  console.error(errorMessage, error);
  return new Error(errorMessage);
}

export default productApi;