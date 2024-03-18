import { useDispatch, useSelector } from "react-redux";
import MDEditor from "../components/ArticleFormComponents/MDEditor";
import { useTheme } from "../context/ThemeContext";
import ArticleMetaDataForm from "../components/ArticleFormComponents/ArticleMetaDataForm";
import { memo, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  addTag,
  updateArticle,
  updateArticleData,
} from "../features/article/article-slice";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import articleValidate from "../validation/article-form";

function EditArticle() {
  const navigate = useNavigate();
  const isAuthenticated = useAuth();

  if (!isAuthenticated) {
    navigate("/login");
  }

  const { theme } = useTheme();
  const { id } = useParams();
  const article = useSelector((store) => store.article);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        document.title = "loading...";
        const res = await axios.get(`http://localhost:3000/api/article/${id}`);
        document.title = res.data.title;

        dispatch(updateArticle({ ...res.data }));

        res.data.tags.forEach((tag) =>
          dispatch(addTag({ newTag: tag.tag, maxTags: 100 }))
        );

        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const [error, setError] = useState(null);

  const { accessToken } = useSelector((store) => store.user);
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
    <div className="text placeholder-glow mt-5">
      <h1 className="placeholder rounded-1 col-5 me-2"></h1>
      <h1 className="placeholder rounded-1 col-5 me-2"></h1>
      <h1 className="placeholder rounded-1 col-5 me-2"></h1>
      <h1 className="placeholder rounded-1 col-5 me-2"></h1>
      <div style={{ height: "25rem" }} className="pb-3">
        <span className="placeholder rounded-1 col-12 h-100"></span>
      </div>
    </div>
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
