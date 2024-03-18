/* eslint-disable react/prop-types */
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { memo } from "react";

function CodeHighlighter({ inline, className, children, ...props }) {
  // Extract language from className, or set to 'text' as default
  const match = /language-(\w+)/.exec(className || "");

  return !inline && match ? (
    <SyntaxHighlighter
      language={match[1] || "javascript"}
      wrapLines
      style={oneDark}
    >
      {String(children).replace(/\n$/, "")}
    </SyntaxHighlighter>
  ) : (
    <code className={`${className} small-code`} {...props}>
      {children}
    </code>
  );
}
export default memo(CodeHighlighter);
