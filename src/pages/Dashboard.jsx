/* eslint-disable react/prop-types */
import { IoEyeOutline } from "react-icons/io5";
import { LuFileText } from "react-icons/lu";
import { IoIosAdd } from "react-icons/io";
import {
  DataGrid,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
  GridToolbar,
} from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import {
  deleteArticle,
  fetchAllArticlesData,
} from "../features/articles/all-articles-slice";
import { Link, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Pagination, PaginationItem } from "@mui/material";

const formatDate = (dateString) => {
  const options = { day: "numeric", month: "short", year: "numeric" };
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", options).format(date);
};

function Dashboard() {
  useDocumentTitle("Admin Dashboard");

  const navigate = useNavigate();
  const isAuthenticated = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearArticle());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      dispatch(fetchAllArticlesData());
    }
  }, [isAuthenticated, dispatch, navigate]);

  const { data, loading } = useSelector((state) => state.allArticles);

  const columns = useMemo(
    () => [
      { field: "title", headerName: "Article Title", width: 300 },
      {
        field: "date",
        headerName: "Date",
        width: 120,
        renderCell: (params) => formatDate(params.row.date),
      },
      { field: "author", headerName: "Article Author", width: 200 },
      {
        field: "views",
        headerName: "Views",
        type: "number",
        width: 80,
        renderCell: (params) => Number(params.row.views).toLocaleString(),
      },
      {
        field: "action",
        headerName: "Action",
        type: "action",
        width: 100,
        renderCell: (params) => <OperationButtons row={params.row} />,
        sortable: false,
        filterable: false,
      },
    ],
    []
  );

  if (loading || !data) {
    return (
      <div className="background">
        <div className="container d-flex justify-content-center align-items-center vh-100">
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        </div>
      </div>
    );
  }

  return (
    <div className="background">
      <div className="container">
        <section className="dashboard text py-4">
          <div className="d-flex justify-content-between">
            <h3 className="mb-0">Dashboard</h3>
            <Link
              to={"/add-article"}
              className="btn btn-outline-secondary text"
            >
              <IoIosAdd className="mr-3" style={{ fontSize: "1.5rem" }} />
              Add Article
            </Link>
          </div>
          <div className="d-flex flex-wrap justify-content-center justify-content-sm-start  gap-2 mt-3">
            <div className="card background rounded p-3 d-flex flex-row gap-2 align-items-center border-color">
              <div className="icon text">
                <LuFileText
                  style={{ color: "rgb(59 130 246)", fontSize: "2rem" }}
                />
              </div>
              <div className="content d-flex flex-column">
                <h5 className="title text">Total Articles</h5>
                <div className="stat article-text">
                  {Number(data.length).toLocaleString()}
                </div>
              </div>
            </div>
            <div className="card background rounded p-3 d-flex flex-row gap-2 align-items-center border-color">
              <div className="icon text">
                <IoEyeOutline
                  style={{ color: "rgb(234 179 8)", fontSize: "2rem" }}
                />
              </div>
              <div className="content d-flex flex-column text">
                <h5 className="title">Total Views</h5>
                <div className="stat article-text">
                  {Number(
                    data.reduce((acc, cur) => acc + Number(cur.views), 0)
                  ).toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="text py-4">
          <h3 className="mb-0">All Articles</h3>
          <div className="mt-3" style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={data}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
                sorting: {
                  sortModel: [{ field: "date", sort: "desc" }],
                },
              }}
              slots={{ pagination: CustomPagination, toolbar: GridToolbar }}
              pageSizeOptions={[5, 10]}
              className="text"
              getRowId={(row) => row.id}
              disableRowSelectionOnClick
              // onRowClick={handleEvent}
            />
          </div>
        </section>
      </div>
    </div>
  );
}
export default Dashboard;

function CustomPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <Pagination
      color="primary"
      variant="outlined"
      page={page + 1}
      count={pageCount}
      // @ts-expect-error
      renderItem={(props2) => (
        <PaginationItem
          className="text border-color"
          {...props2}
          disableRipple
        />
      )}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  );
}

import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import { clearArticle } from "../features/article/article-slice";
import useDocumentTitle from "../hooks/useDocumentTitle";

// eslint-disable-next-line react/prop-types
const OperationButtons = ({ row }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleEdit = (row) => {
    navigate(`/edit-article/${row.id}`);
  };

  const [loading, setLoading] = useState(false);
  const { accessToken } = useSelector((store) => store.user);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete this article?")) {
      try {
        setLoading(true);
        const res = await axios.delete(
          `http://localhost:3000/api/article/${id}`,
          {
            headers: {
              authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setLoading(false);

        if (res.status === 204) {
          dispatch(deleteArticle(id));
          alert(`Deleted article with id : ${id}`);
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
  };
  return (
    <div className="d-flex gap-2 align-items-center">
      <FiEdit
        fontSize={"1.5rem"}
        cursor={"pointer"}
        color="#3b82f6"
        // eslint-disable-next-line react/prop-types
        onClick={() => handleEdit(row)}
      />

      {loading ? (
        <span
          className="spinner-border spinner-border-sm"
          aria-hidden="true"
        ></span>
      ) : (
        <RiDeleteBin6Line
          fontSize={"1.6rem"}
          cursor={"pointer"}
          color="red"
          onClick={() => handleDelete(row.id)}
        />
      )}
    </div>
  );
};
