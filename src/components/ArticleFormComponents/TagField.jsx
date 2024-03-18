import { memo, useState } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addTag, removeTag } from "../../features/article/article-slice";
const MAX_TAGS = 5;

const TagField = () => {
  const tags = useSelector((store) => store.article.tags);

  const dispatch = useDispatch();

  // track the use input
  const [userInput, setUserInput] = useState("");

  // Handle input onChange
  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const [error, setError] = useState(null);

  // handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission or new line creation

      // validating the added tag
      if (
        userInput.trim() !== "" &&
        userInput.length <= 15 &&
        tags.length < MAX_TAGS
      ) {
        dispatch(addTag({ newTag: userInput, maxTags: MAX_TAGS }));
        setUserInput(""); // Clear the input after adding a tag
        error ? setError("") : null;
      } else if (userInput.length > 15) {
        setError("Tag must be at most 15 characters.");
      }
    }
  };

  return (
    <div className="flex flex-col col-12 col-sm-6 col-md-4">
      <Form.Group controlId="keyword_tags">
        <FloatingLabel
          controlId="keyword_tags"
          label={
            tags.length < MAX_TAGS
              ? "Add a tag"
              : `You can only add ${MAX_TAGS} tags max.`
          }
          className="mb-3 text background"
        >
          <Form.Control
            type="text"
            name="keyword_tags"
            autoComplete="off"
            className="background text border-color shadow-none"
            onKeyDown={handleKeyPress}
            onChange={handleInputChange}
            value={userInput}
            disabled={tags.length === MAX_TAGS}
            placeholder="Add a tag"
          />
        </FloatingLabel>
        {error && <div className="invalid-feedback d-block">{error}</div>}
      </Form.Group>

      {/* ===== Render the tags ===== */}

      <div className="d-flex flex-row flex-wrap gap-2 mt-4 ">
        {tags.map((tag, index) => (
          <div
            key={`${index}-${tag}`}
            className="d-inline-flex justify-content-center align-items-center rounded-pill text-sm shadow-sm font-medium tag-bg text-white px-2"
          >
            {tag}
            <button
              className="ms-1 btn text-black px-1 py-1"
              onClick={() => dispatch(removeTag({ tag: tag }))}
              title={`Remove ${tag}`}
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(TagField);
