import { memo, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchArticle } from "../features/article/article-slice";
import { lazy } from "react";
import { Suspense } from "react";
import readingTime from "reading-time/lib/reading-time";
import formatDate from "../utilities/format-date";

const MarkdownContent = lazy(() =>
  import("../components/articleComponents/MarkdownContent")
);

function Article() {
  const { id } = useParams();
  const article = useSelector((store) => store.article);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch the article on mount if it's not already in the store
  useEffect(() => {
    dispatch(fetchArticle({ id })).then((response) => {
      if (response.payload && response.payload.status === 200) {
        document.title = response.payload.title;
      } else {
        navigate("/404");
      }
    });
  }, [dispatch, id, navigate]);

  useEffect(() => scrollTo({ top: 0 }), []);

  return (
    <main className="background">
      <div className="container">
        <div
          className="article-image px-md-5 mx-auto w-100 w-lg-75"
          style={{ height: "20rem" }}
        >
          <img
            src={article.cover}
            className="object-fit-cover w-100 h-100 "
            alt={article.title}
          />
        </div>
        <div className="d-flex flex-column mt-4 px-md-5 mx-auto">
          <h2 className="title text text-capitalize w-100 w-lg-75 mx-auto">
            {article.title}
          </h2>
          <div className="info d-flex flex-wrap article-text w-100 w-lg-75 mx-auto">
            <h6 className="author text px-1">Written by {article.author}</h6>
            {"•"}
            <div className="date px-1">{formatDate(article.date)}</div>
            {"•"}
            <span className="px-1">{readingTime(article.content).text}</span>
          </div>
          {article.tags && article.tags.length ? (
            <div className="badges d-flex flex-wrap gap-2 w-100 w-lg-75 mx-auto mt-2">
              {article.tags.map((tag, index) => {
                return (
                  <span
                    key={`${index}-${tag}`}
                    className="tag px-3 py-1 rounded-5"
                  >
                    {tag}
                  </span>
                );
              })}
            </div>
          ) : null}
          <Suspense fallback={<ContentPlaceholder />}>
            <MarkdownContent />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
export default memo(Article);

const ContentPlaceholder = () => {
  return (
    <div className="card-text placeholder-glow mt-5 mb-4 d-flex flex-column gap-2 pb-1 w-100 w-lg-75 mx-auto">
      <span className="placeholder rounded-1 col-6"></span>
      <span className="placeholder rounded-1 col-7"></span>
      <h2>
        <span className="placeholder rounded-1 col-4"></span>
      </h2>
      <span className="placeholder rounded-1 col-6"></span>
      <span className="placeholder rounded-1 col-4"></span>
      <span className="placeholder rounded-1 col-7"></span>
      <span className="placeholder rounded-1 col-5"></span>
      <span className="placeholder rounded-1 col-8"></span>
      <span className="placeholder rounded-1 col-6"></span>
      <span className="placeholder rounded-1 col-7"></span>
      <span className="placeholder rounded-1 col-4"></span>
      <span className="placeholder rounded-1 col-8"></span>
      <h3>
        <span className="placeholder rounded-1 col-5"></span>
      </h3>
      <span className="placeholder rounded-1 col-8"></span>
      <span className="placeholder rounded-1 col-6"></span>
    </div>
  );
};
