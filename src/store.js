import { configureStore } from "@reduxjs/toolkit";
import articleReducer from "./features/article/article-slice";
import articlesReducer from "./features/articles/articles-slice";
import recentArticlesSlice from "./features/articles/recent-articles-slice";
import allArticlesSlice from "./features/articles/all-articles-slice";
import userSlice from "./features/user/user-slice";
allArticlesSlice;
const store = configureStore({
  reducer: {
    article: articleReducer,
    articles: articlesReducer,
    recentArticles: recentArticlesSlice,
    allArticles: allArticlesSlice,
    user: userSlice,
  },
});
export default store;
