import { memo } from "react";
import NormalPostCard from "./NormalPostCard";
import { useSelector } from "react-redux";
import NormalCardPlaceholder from "./NormalCardPlaceholder";

function AllPostsList() {
  const { loading, data, error } = useSelector((state) => state.articles);

  if (loading) {
    const placeholderCount = 6; // Number of placeholders to render
    const placeholders = Array.from({ length: placeholderCount }).map(
      (_, index) => <NormalCardPlaceholder key={index} />
    );

    return (
      <div className="row gx-3 pt-4">
        <h4 className="title col-12 text mb-3 text-capitalize">
          All blog posts
        </h4>
        {placeholders}
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (data) {
    return (
      <div className="all-posts pt-4">
        <h4 className="title col-12 text mb-3 text-capitalize">
          All blog posts
        </h4>

        <div className="row gx-3 gy-3 ">
          {data.length
            ? data.map((article) => {
                return <NormalPostCard key={article.id} article={article} />;
              })
            : null}
        </div>
      </div>
    );
  }
}
export default memo(AllPostsList);
