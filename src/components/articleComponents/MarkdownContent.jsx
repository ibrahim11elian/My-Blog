import { useMemo } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import CodeHighlighter from "./CodeHighlighter";
import { useSelector } from "react-redux";

function MarkdownContent() {
  const articleContent = useSelector((store) => store.article.content);
  // Memoize the Markdown component
  const memoizedMarkdown = useMemo(
    () => (
      <Markdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          code: CodeHighlighter,
          a: ({ children, ...props }) => (
            <a {...props} style={{ textDecoration: "none" }}>
              {children}
            </a>
          ),
          // p: ({ children }) => <div>{children}</div>,
        }}
      >
        {articleContent}
      </Markdown>
    ),
    [articleContent]
  );
  return (
    <article className="mt-4 markdown-container pb-1">
      {memoizedMarkdown}
    </article>
  );
}
export default MarkdownContent;
