import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  date: `${new Date()}`,
  title: "",
  content: "",
  description: "",
  author: "",
  tags: [],
  views: 0,
  loading: false,
};

const articleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {
    updateArticle: (state, { payload }) => {
      if (payload.content !== undefined) {
        state.content = payload.content;
      }
      if (payload.cover !== undefined) {
        state.cover = payload.cover;
      }
      if (payload.author !== undefined) {
        state.author = payload.author;
      }
      if (payload.title !== undefined) {
        state.title = payload.title;
      }
      if (payload.description !== undefined) {
        state.description = payload.description;
      }
      if (payload.views !== undefined) {
        state.views = payload.views;
      }
      if (payload.date !== undefined) {
        state.date = payload.date;
      }
    },
    addTag: (state, { payload }) => {
      if (
        payload.newTag &&
        !state.tags.includes(payload.newTag) &&
        state.tags.length < payload.maxTags
      ) {
        state.tags.push(payload.newTag);
      }
    },
    removeTag: (state, { payload }) => {
      const newTagList = state.tags.filter((t) => t !== payload.tag);
      state.tags = [...newTagList];
    },
    clearArticle: (state) => {
      Object.assign(state, initialState);
      state.cover = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addArticle.pending, (state) => {
        state.loading = true;
      })
      .addCase(addArticle.fulfilled, (state) => {
        state.loading = false;
        state.status = "succeeded";
        Object.assign(state, initialState);
      })
      .addCase(addArticle.rejected, (state, { error }) => {
        state.status = "failed";
        error = JSON.parse(error.message);

        state.loading = false;
        state.error = error.data;
      })
      .addCase(updateArticleData.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateArticleData.fulfilled, (state) => {
        state.loading = false;
        state.status = "succeeded";
        Object.assign(state, initialState);
      })
      .addCase(updateArticleData.rejected, (state, { error }) => {
        state.status = "failed";
        error = JSON.parse(error.message);

        state.loading = false;
        state.error = error.data;
      });
  },
});

export const addArticle = createAsyncThunk(
  "article/addArticleAsync",
  async ({ article, cover, accessToken }) => {
    const { title, content, description, author, tags } = article;
    const formData = new FormData();
    formData.append(
      "data",
      JSON.stringify({ title, content, description, author, tags })
    );
    formData.append("cover", cover);
    try {
      const res = await axios.post(
        "http://localhost:3000/api/article",
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      return res.data;
    } catch (error) {
      throw new Error(JSON.stringify(error.response));
    }
  }
);

export const updateArticleData = createAsyncThunk(
  "article/updateArticleAsync",
  async ({ articleId, article, cover, accessToken }) => {
    const formData = new FormData();
    formData.append("data", JSON.stringify(article));

    if (cover) {
      formData.append("cover", cover);
    }
    try {
      const res = await axios.put(
        `http://localhost:3000/api/article/${articleId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      return res.data;
    } catch (error) {
      throw new Error(JSON.stringify(error.response));
    }
  }
);

export const { updateArticle, addTag, removeTag, clearArticle } =
  articleSlice.actions;

export default articleSlice.reducer;
