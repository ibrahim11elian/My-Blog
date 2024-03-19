import { memo, useEffect } from "react";
// import img from "../assets/article-img.png";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addTag, updateArticle } from "../features/article/article-slice";
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

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`http://localhost:3000/api/article/${id}`);

        document.title = res.data.title;
        dispatch(updateArticle({ ...res.data }));
        if (res.data.tags && res.data.tags.length) {
          res.data.tags.forEach((tag) => {
            dispatch(addTag({ newTag: tag, maxTags: 5 }));
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => scrollTo({ top: 0 }), []);

  return (
    <main className="background">
      <div className="container">
        <div
          className="article-image mx-md-5 px-md-5"
          style={{ height: "20rem" }}
        >
          <img
            src={article.cover}
            className=" object-fit-cover w-100 h-100 "
            alt="sass"
          />
        </div>
        <div className="d-flex flex-column mt-4 px-md-5 mx-md-5">
          <h2 className="title text text-capitalize">{article.title}</h2>
          <div className="info d-flex gap-3 article-text">
            <h6 className="author text">Written by {article.author}</h6>
            {"•"}
            <div className="date">{formatDate(article.date)}</div>
            {"•"}
            <span>{readingTime(article.content).text}</span>
          </div>
          {article.tags && article.tags.length ? (
            <div className="badges d-flex flex-wrap gap-2 mt-auto ">
              {article.tags.map((tag, index) => {
                return (
                  <span key={index} className="tag px-3 py-1 rounded-5">
                    {tag.tag}
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
    <div className="card-text placeholder-glow mt-5 mb-4 d-flex flex-column gap-2 pb-1 ">
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
