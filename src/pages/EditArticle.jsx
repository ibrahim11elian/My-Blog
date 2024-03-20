import { useDispatch, useSelector } from "react-redux";
import MDEditor from "../components/ArticleFormComponents/MDEditor";
import { useTheme } from "../context/ThemeContext";
import ArticleMetaDataForm from "../components/ArticleFormComponents/ArticleMetaDataForm";
import { memo, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchArticle,
  updateArticleData,
} from "../features/article/article-slice";
import articleValidate from "../validation/article-form";

function EditArticle() {
  const navigate = useNavigate();
  const { accessToken, isAuthenticated } = useSelector((store) => store.user);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const { theme } = useTheme();
  const { id } = useParams();
  const article = useSelector((store) => store.article);
  const { loading } = useSelector((store) => store.article);
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "loading...";
    dispatch(fetchArticle({ id })).then((response) => {
      if (response.payload && response.payload.status === 200) {
        document.title = response.payload.title;
      } else {
        navigate("/404");
      }
    });
  }, [dispatch, id, navigate]);

  const [error, setError] = useState(null);

  const [cover, setCover] = useState(null);

  const handleSubmit = async (id) => {
    const [isError, error] = articleValidate(article);
    if (isError) {
      setError(error);
    } else {
      dispatch(
        updateArticleData({ articleId: id, article, cover, accessToken })
      ).then((response) => {
        if (response.payload.code === 200) {
          navigate(`/admin`);
          alert("Your article has been updated!");
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
        {loading ? (
          <ContentPlaceholder />
        ) : (
          <>
            <ArticleMetaDataForm
              error={error}
              cover={cover}
              setCover={setCover}
            />

            <h3 className="text text-capitalize mb-3">edit your article</h3>

            <MDEditor error={error} />
            <button
              className="btn btn-secondary my-3"
              onClick={() => handleSubmit(id)}
              disabled={article.loading}
            >
              {article.loading ? <LoadingSpinner /> : " Save Changes"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
export default memo(EditArticle);

const ContentPlaceholder = () => {
  return (
    <>
      <div className="text placeholder-glow mt-5 d-flex gap-2 flex-wrap justify-content-center align-items-center">
        <h1 className="placeholder rounded-1 mb-0 col-12 col-sm-6 col-md-4"></h1>
        <h1 className="placeholder rounded-1 mb-0 col-12 col-sm-6 col-md-4"></h1>
        <h1 className="placeholder rounded-1 mb-0 col-12 col-sm-6 col-md-4"></h1>
        <h1 className="placeholder rounded-1 mb-0 col-12 col-sm-6 col-md-4"></h1>
        <div
          style={{ height: "10rem" }}
          className=" mb-0 col-12 col-sm-6 col-md-4"
        >
          <span className="placeholder rounded-1 col-12 h-100"></span>
        </div>
      </div>
      <div
        style={{ height: "25rem" }}
        className="text pb-3 placeholder-glow mt-2"
      >
        <span className="placeholder rounded-1 col-12 h-100"></span>
      </div>
    </>
  );
};

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
