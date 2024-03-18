import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Define the async thunk for fetching articles data
export const fetchArticlesData = createAsyncThunk(
  "articles/fetchArticlesData",
  async ({ page, itemsPerPage }) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/article?page=${page}&itemsPerPage=${itemsPerPage}`
      );
      const jsonData = await response.json();
      return jsonData;
    } catch (error) {
      throw Error("Failed to fetch articles");
    }
  }
);

// Define the articles slice
export const articlesSlice = createSlice({
  name: "articles",
  initialState: {
    data: null,
    loading: false,
    error: null,
    currentPage: 1,
    itemsPerPage: 6, // Adjust as needed
    totalItems: 0, // Populate this value when fetching data
  },
  reducers: {
    setCurrentPage: (state, { payload }) => {
      state.currentPage = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticlesData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchArticlesData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        // altering the the 3 recent and hot articles from the total number of articles in the API.
        state.totalItems =
          action.payload.totalItems > 3 ? action.payload.totalItems - 3 : 0;
        state.currentPage = action.payload.currentPage;
        state.itemsPerPage = action.payload.itemsPerPage;
      })
      .addCase(fetchArticlesData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { deleteArticle, setCurrentPage } = articlesSlice.actions;
export default articlesSlice.reducer;
