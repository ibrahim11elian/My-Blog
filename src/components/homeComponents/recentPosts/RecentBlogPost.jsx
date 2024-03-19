/* eslint-disable react/prop-types */
import TruncatedText from "../TruncatedText";
import { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import formatDate from "../../../utilities/format-date";

function RecentBlogPost() {
  const [articles, setArticles] = useState([]);
  const { data, loading } = useSelector((state) => state.recentArticles);

  useEffect(() => {
    if (data) {
      setArticles(data ? data.slice(1) : []);
    }
  }, [data]);

  if (loading) {
    return (
      <div className="col-12 col-lg-6 d-flex flex-column gap-3">
        <PlaceholderComponent />
        <PlaceholderComponent />
      </div>
    );
  }

  return (
    <div className="col-12 col-lg-6 d-flex flex-column gap-3">
      {articles.length
        ? articles.map((article) => {
            return (
              <div
                key={article.id}
                className="article-card card flex-column flex-lg-row col-lg-12 shadow border-none rounded background"
              >
                <img
                  src={article.cover}
                  className="card-img-left object-fit-cover col-12 col-lg-6 rounded"
                  alt={article.title}
                  loading="lazy"
                />
                <div className="card-body background rounded-right d-flex flex-column overflow-hidden ">
                  <span className="info d-flex gap-1">
                    <div className="author text-capitalize">
                      {article.author}
                    </div>
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
                  <TruncatedText text={article.description} />
                  <div className="badges d-flex flex-wrap gap-2 mt-auto ">
                    {article.tags && article.tags.length
                      ? article.tags.map((tag) => {
                          return (
                            <span
                              key={tag.id}
                              className="tag px-3 py-1 rounded-5"
                            >
                              {tag.tag}
                            </span>
                          );
                        })
                      : null}
                  </div>
                </div>
                <div className="ribbon new">
                  <span className="ribbon__content new">new</span>
                </div>
              </div>
            );
          })
        : null}
    </div>
  );
}

export default memo(RecentBlogPost);

const PlaceholderComponent = () => {
  return (
    <div className="card flex-row col-lg-12 shadow border-none rounded">
      <div className="placeholder-glow col-5">
        <span className="placeholder col-12 h-100"></span>
      </div>

      <div className="card-body background rounded-right d-flex flex-column p-4">
        <p className=" d-flex gap-1 placeholder-glow mb-1">
          <span className="placeholder rounded-1 col-3"></span>
        </p>
        <h5 className=" placeholder-glow rounded-1">
          <span className="placeholder rounded-1 col-6"></span>
        </h5>
        <p className="card-text placeholder-glow rounded-1 d-flex flex-column gap-1 mt-3">
          <span className="placeholder rounded-1 col-10"></span>
          <span className="placeholder rounded-1 col-7"></span>
          <span className="placeholder rounded-1 col-8"></span>
        </p>
        <p className="placeholder-glow rounded-1 d-flex flex-wrap gap-2 mt-auto">
          <span className="placeholder rounded-1 col-2 p-2 rounded-5"></span>
          <span className="placeholder rounded-1 col-2 p-2  rounded-5"></span>
          <span className="placeholder rounded-1 col-2 p-2 rounded-5"></span>
        </p>
      </div>
    </div>
  );
};
