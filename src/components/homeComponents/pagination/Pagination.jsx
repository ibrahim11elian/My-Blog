import { memo, useEffect } from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchArticlesData,
  setCurrentPage,
} from "../../../features/articles/articles-slice";

function PaginationComponent() {
  const dispatch = useDispatch();
  const { loading, itemsPerPage, currentPage, totalItems } = useSelector(
    (state) => state.articles
  );

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Trigger fetchArticlesData action when currentPage changes
  useEffect(() => {
    dispatch(fetchArticlesData({ page: currentPage, itemsPerPage }));
  }, [currentPage, dispatch, itemsPerPage]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      dispatch(setCurrentPage(currentPage - 1));
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      dispatch(setCurrentPage(currentPage + 1));
    }
  };

  const handlePageClick = (pageNumber) => {
    dispatch(setCurrentPage(pageNumber));
  };

  if (loading || totalPages <= 1) {
    return "";
  }

  return (
    <nav
      aria-label="Page navigation"
      className=" d-flex flex-column gap-2 text-center flex-sm-row justify-content-sm-between mt-3 "
    >
      <button
        className="text-decoration-none border-0 background text"
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
      >
        <FaArrowLeft /> Previous
      </button>

      <ul className="pagination justify-content-center gap-1 mb-0">
        {[...Array(totalPages > 5 ? 5 : totalPages).keys()].map((index) => (
          <li key={index} className="page-item">
            <button
              className={`background text btn btn-outline-primary rounded border-color ${
                currentPage === index + 1 ? "active-page" : ""
              }`}
              onClick={() => handlePageClick(index + 1)}
            >
              {index + 1}
            </button>
          </li>
        ))}
        {totalPages > 5 && (
          <>
            <li className="page-item disabled">
              <span className="page-link">...</span>
            </li>
            <li className="page-item">
              <button
                className={`background text btn btn-outline-primary rounded-1 border-color ${
                  currentPage === totalPages ? "active-page" : ""
                }`}
                onClick={() => handlePageClick(totalPages)}
              >
                {totalPages}
              </button>
            </li>
          </>
        )}
      </ul>

      <button
        className="text-decoration-none border-0 background text"
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      >
        Next <FaArrowRight />
      </button>
    </nav>
  );
}

export default memo(PaginationComponent);
