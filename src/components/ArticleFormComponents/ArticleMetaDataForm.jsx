/* eslint-disable react/prop-types */

import { Form } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useDispatch, useSelector } from "react-redux";
import { updateArticle } from "../../features/article/article-slice";
import { memo } from "react";
import { RiImageAddLine } from "react-icons/ri";
import TagField from "./TagField";

function ArticleMetaDataForm({ error, cover, setCover }) {
  return (
    <div className="article-form mb-4">
      <h3 className="text">Article Metadata</h3>
      <Form className="d-flex gap-3 flex-wrap justify-content-center  align-items-center">
        <ArticleTitle error={error} />

        <ArticleAuthor error={error} />

        <ArticleDescription error={error} />

        <TagField />

        <ArticleCover error={error} cover={cover} setCover={setCover} />
      </Form>
    </div>
  );
}
export default memo(ArticleMetaDataForm);

const ArticleTitle = memo(function ArticleTitle({ error }) {
  const title = useSelector((store) => store.article.title);
  const dispatch = useDispatch();
  return (
    <Form.Group
      className="mb-3 col-12 col-sm-6 col-md-4"
      controlId="articleTitle"
    >
      <FloatingLabel
        controlId="articleTitle"
        label="Article Title"
        className="text background"
      >
        <Form.Control
          type="text"
          name="articleTitle"
          autoComplete="off"
          value={title || ""}
          className="background text border-color shadow-none"
          onChange={(e) => dispatch(updateArticle({ title: e.target.value }))}
          placeholder="Enter Title"
        />
      </FloatingLabel>
      {error && error.title && (
        <div className="invalid-feedback d-block">{error.title}</div>
      )}
    </Form.Group>
  );
});

const ArticleDescription = memo(function ArticleDescription({ error }) {
  const description = useSelector((store) => store.article.description);
  const dispatch = useDispatch();
  const handleDescriptionChange = (e) => {
    const limit = 500;

    dispatch(updateArticle({ description: e.target.value.slice(0, limit) }));
  };
  return (
    <Form.Group
      className=" align-self-start mb-3 col-12 col-sm-6 col-md-4"
      controlId="articleDescription"
    >
      <FloatingLabel
        controlId="articleDescription"
        label={`Article Description ${description.length}/500`}
        className="text background"
      >
        <Form.Control
          type="text"
          name="articleDescription"
          className="background text border-color shadow-none"
          autoComplete="off"
          value={description || ""}
          onChange={(e) => handleDescriptionChange(e)}
          placeholder="Enter Article Description"
        />
      </FloatingLabel>
      {error && error.description && (
        <div className="invalid-feedback d-block">{error.description}</div>
      )}
    </Form.Group>
  );
});

const ArticleAuthor = memo(function ArticleAuthor({ error }) {
  const author = useSelector((store) => store.article.author);
  const dispatch = useDispatch();
  return (
    <Form.Group
      className="mb-3 col-12 col-sm-6 col-md-4"
      controlId="articleAuthor"
    >
      <FloatingLabel
        controlId="articleAuthor"
        label="Article Author Name"
        className=" text background"
      >
        <Form.Control
          type="text"
          name="articleAuthor"
          className="background text border-color shadow-none"
          autoComplete="off"
          value={author || ""}
          onChange={(e) => dispatch(updateArticle({ author: e.target.value }))}
          placeholder="Enter Author Name"
        />
      </FloatingLabel>
      {error && error.author && (
        <div className="invalid-feedback d-block">{error.author}</div>
      )}
    </Form.Group>
  );
});

const ArticleCover = memo(function ArticleCover({ error, cover, setCover }) {
  const article = useSelector((state) => state.article);
  const dispatch = useDispatch();

  const handleChangeImage = (e) => {
    if (e.target.files[0]) {
      if (!e.target.files[0].type.startsWith("image")) {
        alert("Please select an image file");
        setCover(null);
      } else {
        setCover(e.target.files[0]);
        dispatch(updateArticle({ cover: e.target.files[0].name }));
      }
    } else {
      setCover(null);
      dispatch(updateArticle({ cover: "" }));
    }
  };
  return (
    <Form.Group controlId="formFile" className="col-12 col-sm-6 col-md-4 ">
      <Form.Control
        className="d-none"
        type="file"
        onChange={handleChangeImage}
      />
      <Form.Label
        className="col-12"
        title="Upload Cover Image (landscape is preferred)"
      >
        <div className="article-cover border border-color col-12 ">
          {cover ? (
            <img
              src={URL.createObjectURL(cover)}
              className="w-100 h-100 object-fit-contain"
              alt=""
            />
          ) : article.cover ? (
            <img
              src={article.cover}
              className="w-100 h-100 object-fit-contain"
              alt=""
            />
          ) : (
            <div className="overlay w-100 h-100 d-flex justify-content-center align-items-center">
              <RiImageAddLine color="black" />
            </div>
          )}
        </div>
        {error && error.cover && (
          <div className="invalid-feedback d-block text-center ">
            {error.cover}
          </div>
        )}
        <p className="text-center mt-1 mb-0">Article Cover</p>
      </Form.Label>
    </Form.Group>
  );
});
