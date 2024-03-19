/* eslint-disable react/prop-types */
import TruncatedText from "../TruncatedText";
import { memo } from "react";
import { Link } from "react-router-dom";
import formatDate from "../../../utilities/format-date";

function NormalPostCard({ article }) {
  return (
    <div className="col-12 col-sm-6 col-md-4">
      <div className="card shadow border-none rounded mb-3 h-100">
        <img
          src={article.cover}
          style={{ height: "15rem" }}
          className="card-img-top object-cover"
          alt={article.title}
          loading="lazy"
        />
        <div className="card-body background rounded-bottom d-flex flex-column">
          <span className="info d-flex gap-1">
            <div className="author">{article.author}</div>
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
              {`${article.title.slice(0, 30)}${
                article.title.length > 30 ? "..." : ""
              }`}
            </h5>
          </Link>
          <TruncatedText text={article.description} />
          <div className="badges d-flex flex-wrap gap-2 mt-auto">
            {article.tags && article.tags.length
              ? article.tags.map((tag) => {
                  return (
                    <span
                      key={tag.id}
                      className="tag px-3 py-1 rounded-5 text-capitalize"
                    >
                      {tag.tag}
                    </span>
                  );
                })
              : null}
          </div>
        </div>
      </div>
    </div>
  );
}
export default memo(NormalPostCard);
