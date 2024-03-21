import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Define the async thunk for fetching all articles data
export const fetchAllArticlesData = createAsyncThunk(
  "allArticles/fetchAllArticlesData",
  async () => {
    const articlesWithoutRecent = await axios.get(`${API_URL}/article`);
    const recentArticles = await axios.get(`${API_URL}/recent-articles`);
    const all = articlesWithoutRecent.data;
    const recent = await recentArticles.data;
    return [...recent, ...all.data];
  }
);

// Define the articles slice for the dashboard to combine the recent articles and the other all articles
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
