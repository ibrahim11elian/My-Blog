import { useMemo } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import CodeHighlighter from "./CodeHighlighter";
import { useSelector } from "react-redux";

function MarkdownContent() {
  const articleContent = useSelector((store) => store.article.content);
  // Memoize the Markdown component
  const memoizedMarkdown = useMemo(
    () => (
      <Markdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug, rehypeRaw]}
        components={{
          code: CodeHighlighter,
          a: ({ children, ...props }) => (
            <a {...props} style={{ textDecoration: "none" }}>
              {children}
            </a>
          ),
          table: ({ children, ...props }) => (
            <table {...props} className="table table-striped table-bordered">
              {children}
            </table>
          ),
          p: ({ children, ...props }) => (
            <p {...props} className=" fw-light ">
              {children}
            </p>
          ),
        }}
      >
        {articleContent}
      </Markdown>
    ),
    [articleContent]
  );
  return (
    <article className="mt-4 markdown-container lh-lg  pb-1 mx-auto">
      {memoizedMarkdown}
    </article>
  );
}
export default MarkdownContent;
