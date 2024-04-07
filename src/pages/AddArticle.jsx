import { useDispatch, useSelector } from "react-redux";
import MDEditor from "../components/ArticleFormComponents/MDEditor";
import { useTheme } from "../context/ThemeContext";
import ArticleMetaDataForm from "../components/ArticleFormComponents/ArticleMetaDataForm";
import { memo, useEffect, useState } from "react";
import { addArticle, clearArticle } from "../features/article/article-slice";
import { useNavigate } from "react-router-dom";
import articleValidate from "../validation/article-form";
import useDocumentTitle from "../hooks/useDocumentTitle";
import notify from "../utilities/alert-toastify";

function AddArticle() {
  useDocumentTitle("Script Symphony - Add Article");

  const navigate = useNavigate();
  const { accessToken, isAuthenticated } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    scrollTo({ top: 0 });
    // Reset the state when navigating to this page to prevent bugs
    dispatch(clearArticle());

    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [dispatch, isAuthenticated, navigate]);

  const { theme } = useTheme();
  const article = useSelector((store) => store.article);
  const loading = useSelector((store) => store.article.loading);

  const [cover, setCover] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    const [isError, error] = articleValidate(article);
    if (isError) {
      setError(error);
    } else {
      dispatch(addArticle({ article, cover, accessToken })).then((response) => {
        if (response.payload.code === 201) {
          navigate(`/admin`);
          notify("Your article has been posted!", "success");
        } else {
          let error = JSON.parse(response.error.message);
          console.log(error);
        }
      });
    }
  };
  return (
    <div className="background pt-5">
      <div className="container" data-color-mode={theme}>
        <ArticleMetaDataForm error={error} cover={cover} setCover={setCover} />

        <h3 className="text text-capitalize mb-3">
          write your awesome article
        </h3>

        <MDEditor error={error} />
        <button
          className="btn btn-secondary my-3"
          onClick={() => handleSubmit()}
          disabled={loading}
        >
          {loading ? <LoadingSpinner /> : "Publish"}
        </button>
      </div>
    </div>
  );
}
export default memo(AddArticle);

function LoadingSpinner() {
  return (
    <>
      <span
        className="spinner-border spinner-border-sm"
        aria-hidden="true"
      ></span>
      <span className=" ms-1 " role="status">
        Loading...
      </span>
    </>
  );
}
