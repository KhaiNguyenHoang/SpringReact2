import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL = "http://localhost:8080/api/products"
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get(URL+"/getAll");
    return response.data;
  }
);

const initialState = {
    products: [],
    status: "idle",
    error: null,
}

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.products = Array.isArray(action.payload) ? action.payload : action.payload.data || [];
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    }
});

export const selectAllProducts = state => state.products.products;
export const selectProductStatus = state => state.products.status;
export const selectProductError = state => state.products.error;

export default productSlice.reducer;