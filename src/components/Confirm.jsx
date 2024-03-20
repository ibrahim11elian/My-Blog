import { useCallback } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useTheme } from "../context/ThemeContext";
import notify from "../utilities/alert-toastify";
import { useDispatch, useSelector } from "react-redux";
import { deleteArticleAsync } from "../features/article/article-slice";
import PropTypes from "prop-types";

function Confirm({ show, setShow, id }) {
  const { theme } = useTheme();

  const handleClose = () => setShow(false);

  const dispatch = useDispatch();

  const { accessToken } = useSelector((state) => state.user);
  const { loading } = useSelector((state) => state.article);

  const handleDelete = useCallback(() => {
    // Perform delete action
    dispatch(deleteArticleAsync({ id, accessToken })).then((response) => {
      if (response.payload.status === 204) {
        notify(`Article was deleted successfully!`, "success");
      } else {
        notify(`Something went wrong!`, "error");
      }
      setShow(false);
    });
  }, [accessToken, dispatch, id, setShow]);
  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      centered
      className={theme}
    >
      <Modal.Header className="background text border-color">
        <Modal.Title>Confirm Window</Modal.Title>
      </Modal.Header>
      <Modal.Body className="background text ">
        Are you sure you want to delete this article?
      </Modal.Body>
      <Modal.Footer className="background text border-color">
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <button
          className="btn btn-danger"
          onClick={handleDelete}
          disabled={loading}
        >
          {loading ? <LoadingSpinner /> : "Delete"}
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default Confirm;

Confirm.propTypes = {
  /** Show/hide the modal */
  show: PropTypes.bool.isRequired,
  /** The ID of the article that will be deleted */
  id: PropTypes.number.isRequired,
  /** Handle closing the Modal */
  setShow: PropTypes.func.isRequired,
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
