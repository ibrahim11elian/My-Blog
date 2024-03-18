/* eslint-disable react/prop-types */
import MarkdownEditor from "@uiw/react-md-editor";
import { useDispatch, useSelector } from "react-redux";
import { updateArticle } from "../../features/article/article-slice";
import { memo } from "react";

// eslint-disable-next-line react/prop-types
function MDEditor({ error }) {
  const articleContent = useSelector((store) => store.article.content);
  // Get the dispatch function from the Redux store
  const dispatch = useDispatch();

  const handleChange = (value) => {
    dispatch(updateArticle({ content: value }));
  };

  return (
    <>
      {error && error.content && (
        <div className="invalid-feedback d-block">{error.content}</div>
      )}
      <MarkdownEditor
        value={articleContent}
        onChange={handleChange}
        autoFocus={true}
      />
      {/* <div className="mt-4 text">{value}</div> */}
      {/* <MDEditor.Markdown source={value} style={{ whiteSpace: "pre-wrap" }} /> */}
    </>
  );
}
export default memo(MDEditor);
