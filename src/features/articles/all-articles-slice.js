import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Define the async thunk for fetching all articles data
export const fetchAllArticlesData = createAsyncThunk(
  "allArticles/fetchAllArticlesData",
  async () => {
    const articlesWithoutRecent = await fetch(
      `http://localhost:3000/api/article`
    );
    const recentArticles = await fetch(
      `http://localhost:3000/api/recent-articles`
    );
    const all = await articlesWithoutRecent.json();
    const recent = await recentArticles.json();
    return [...recent, ...all.data];
  }
);

// Define the articles slice
export const allArticlesSlice = createSlice({
  name: "allArticles",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    deleteArticle: (state, { payload }) => {
      state.data = state.data.filter((article) => article.id !== payload);
    },
    setCurrentPage: (state, { payload }) => {
      state.currentPage = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllArticlesData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllArticlesData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAllArticlesData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { deleteArticle, setCurrentPage } = allArticlesSlice.actions;
export default allArticlesSlice.reducer;
