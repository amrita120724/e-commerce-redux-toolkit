import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: true,
  success: false,
  error: null,
  products: [],
  product: {},
};

const config = {
  headers: {
    "Content-Type": "application/json",
    // "Access-Control-Allow-Origin": "*",
    // "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH",
  },
};

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    try {
      const response = await axios.get(
        "https://store-api-o6m1.onrender.com/v1/products"
      );
      console.log(response.status);
      return response.data;
    } catch (err) {
      return err.message;
    }
  }
);

export const getProductDetails = createAsyncThunk(
  "products/getProductDetails",
  async (productId) => {
    try {
      const response = await axios.get(
        `https://store-api-o6m1.onrender.com/v1/products/${productId}`
      );
      console.log(response.status);
      return response.data;
    } catch (err) {
      return err.message;
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.success = "Products fetched successfully";
      state.products = action.payload.data;
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    });
    builder.addCase(getProductDetails.pending, (state, action) => {
      state.loading = true;
      state.product = {}
      state.success = false;
    });
    builder.addCase(getProductDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.success = "Product fetched successfully";
      state.product = action.payload.data;
    });
    builder.addCase(getProductDetails.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    });
  },
});

export default productsSlice.reducer;
