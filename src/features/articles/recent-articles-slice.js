import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Define the async thunk for fetching articles data
export const fetchRecentArticlesData = createAsyncThunk(
  "recentArticles/fetchRecentArticlesData",
  async () => {
    const response = await fetch(`http://localhost:3000/api/recent-articles`);
    const jsonData = await response.json();
    return jsonData;
  }
);

// Define the recent articles slice
export const recentArticlesSlice = createSlice({
  name: "recentArticles",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    deleteArticle: (state, { payload }) => {
      state.data = state.data.filter((article) => article.id !== payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecentArticlesData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRecentArticlesData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchRecentArticlesData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { deleteArticle } = recentArticlesSlice.actions;
export default recentArticlesSlice.reducer;
