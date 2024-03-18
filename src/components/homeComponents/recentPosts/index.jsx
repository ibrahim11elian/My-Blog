import { memo } from "react";
import HotPost from "./HotPost";
import RecentBlogPost from "./RecentBlogPost";

function RecentBlogPosts() {
  return (
    <div className="d-flex flex-wrap flex-lg-nowrap gap-3 ">
      <HotPost />
      <RecentBlogPost />
    </div>
  );
}
export default memo(RecentBlogPosts);
