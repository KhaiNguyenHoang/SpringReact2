import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL = "http://localhost:8080/api/products";

export const addProduct = createAsyncThunk(
  "productAdd/addProduct",
  async (productDTO, { rejectWithValue }) => {
    try {
      const response = await axios.post(URL + "/add", productDTO);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  product: null, // Will store the newly added product
  status: "idle",
  error: null,
};

const productAddSlice = createSlice({
  name: "productAdd",
  initialState,
  reducers: {
    // You can add synchronous reducers here if needed
    resetProductAddStatus: (state) => {
      state.status = "idle";
      state.error = null;
      state.product = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addProduct.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Assuming the API returns the added product in action.payload.data
        state.product = action.payload.data;
        state.error = null;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
        state.product = null;
      });
  },
});

export const { resetProductAddStatus } = productAddSlice.actions;
export const productDetail = (state) => state.product;
export const statusDetail = (state) => state.status;
export const errorDetail = (state) => state.error;

export default productAddSlice.reducer;