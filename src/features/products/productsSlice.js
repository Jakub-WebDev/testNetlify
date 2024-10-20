import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to fetch products
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await fetch(
      "https://7ce9-195-191-163-209.ngrok-free.app/products"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await response.json();
    return data;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    // Reducer to update the favorite status of a product
    updateProductFavourite(state, action) {
      const { id, favourite } = action.payload;
      const product = state.items.find((item) => item.id === id);
      if (product) {
        product.favourite = favourite;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Export the action to update the favorite status
export const { updateProductFavourite } = productsSlice.actions;

export default productsSlice.reducer;
