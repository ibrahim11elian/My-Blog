import AllPostsList from "../components/homeComponents/allPosts";
import PaginationComponent from "../components/homeComponents/pagination/Pagination";
import RecentBlogPosts from "../components/homeComponents/recentPosts";
import Header from "../components/header/Header";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchArticlesData } from "../features/articles/articles-slice";
import { fetchRecentArticlesData } from "../features/articles/recent-articles-slice";
import useDocumentTitle from "../hooks/useDocumentTitle";

function Home() {
  useDocumentTitle("Script Symphony");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchArticlesData({ page: 1, itemsPerPage: 6 }));
    dispatch(fetchRecentArticlesData());
  }, [dispatch]);

  useEffect(() => scrollTo({ top: 0 }), []);
  return (
    <main>
      <Header />
      <section className="col-12 background py-4">
        <div className="container">
          <h4 className="title col-12 text mb-3 text-capitalize">
            Recent blog posts
          </h4>
          {/* recent posts */}
          <RecentBlogPosts />

          {/* all posts */}
          <AllPostsList />

          <PaginationComponent />
        </div>
      </section>
    </main>
  );
}
export default Home;
