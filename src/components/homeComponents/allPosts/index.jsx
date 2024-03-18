import { memo } from "react";
import NormalPostCard from "./NormalPostCard";
import { useSelector } from "react-redux";
import NormalCardPlaceholder from "./NormalCardPlaceholder";

function AllPostsList() {
  const { loading, data } = useSelector((state) => state.articles);
  if (loading) {
    return (
      <div className="row gx-3 pt-4">
        <NormalCardPlaceholder />
        <NormalCardPlaceholder />
        <NormalCardPlaceholder />
        <NormalCardPlaceholder />
        <NormalCardPlaceholder />
        <NormalCardPlaceholder />
      </div>
    );
  }
  return (
    <div className="all-posts pt-4">
      <h4 className="title col-12 text mb-3 text-capitalize">All blog posts</h4>

      <div className="row gx-3 gy-3 ">
        {data && data.length
          ? data.map((article) => {
              return <NormalPostCard key={article.id} article={article} />;
            })
          : null}
      </div>
    </div>
  );
}
export default memo(AllPostsList);
