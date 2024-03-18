/* eslint-disable react/prop-types */
import TruncatedText from "../TruncatedText";
import { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const formatDate = (dateString) => {
  if (!dateString) return ""; // Handle null or undefined date
  const options = { day: "numeric", month: "short", year: "numeric" };
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return ""; // Handle invalid date
  return new Intl.DateTimeFormat("en-US", options).format(date);
};

function HotPost() {
  const [article, setArticle] = useState({});
  const { data, loading } = useSelector((state) => state.recentArticles);

  useEffect(() => {
    if (data && data.length) {
      const hottest = data.find((ar) => ar.hottest);
      setArticle(hottest);
    }
  }, [data]);

  if (loading || !article.date) {
    return <PlaceholderComponent />;
  }

  return (
    <div className="card col-12 col-lg-6 shadow border-none rounded">
      <img
        src={article.cover}
        style={{ height: "15rem" }}
        className="card-img-top object-fit-cover"
        alt={article.title}
        loading="lazy"
      />

      <div className="card-body background rounded-bottom d-flex flex-column">
        <span className="info d-flex gap-1">
          <div className="author text-capitalize">{article.author}</div>
          {"•"}
          <div className="date">{formatDate(article.date)}</div>
        </span>
        <Link
          to={`article/${article.id}`}
          target="_blank"
          className="text-decoration-none"
        >
          <h5
            className="card-title my-2 text text-capitalize"
            title={article.title}
          >
            {article.title}
          </h5>
        </Link>
        <TruncatedText text={article.description} factor={5} />
        <div className="badges d-flex flex-wrap gap-2 mt-auto">
          {article.tags.map((tag) => {
            return (
              <span
                key={tag.id}
                className="tag px-3 py-1 rounded-5 text-capitalize"
              >
                {tag.tag}
              </span>
            );
          })}
        </div>
      </div>
      <div className="ribbon">
        <span className="ribbon__content">hot🔥</span>
      </div>
    </div>
  );
}
export default memo(HotPost);

const PlaceholderComponent = () => {
  return (
    <div className="card col-12 col-lg-6 shadow border-none rounded">
      <div className=" placeholder-glow" style={{ height: "15rem" }}>
        <span className="placeholder col-12 h-100"></span>
      </div>

      <div className="card-body background rounded-bottom d-flex flex-column">
        <p className=" d-flex gap-1 placeholder-glow mb-1">
          <span className="placeholder rounded-1 col-3"></span>
        </p>
        <h5 className=" placeholder-glow rounded-1">
          <span className="placeholder rounded-1 col-6"></span>
        </h5>
        <p className="card-text placeholder-glow rounded-1 d-flex flex-column gap-1 mt-3">
          <span className="placeholder rounded-1 col-7"></span>
          <span className="placeholder rounded-1 col-4"></span>
          <span className="placeholder rounded-1 col-6"></span>
        </p>
        <p className="placeholder-glow rounded-1 d-flex flex-wrap gap-2 mt-auto">
          <span className="placeholder rounded-1 col-1 p-2 rounded-5"></span>
          <span className="placeholder rounded-1 col-1 p-2  rounded-5"></span>
          <span className="placeholder rounded-1 col-1 p-2 rounded-5"></span>
        </p>
      </div>
    </div>
  );
};
