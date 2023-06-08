import { Box, IconButton, Skeleton } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import UPDATE from "../team/index";

const BookInfo = () => {
  const [books, setBooks] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [loading, setLoading] = useState(true);
  var [update, setUpdate] = useState(false);
  var [singleValue, setSinglevalue] = useState([]);

  const handleBookDelete = (id) => {
    console.log("Book Deleted" + id);
    axios
      .delete("http://localhost:9453/delete/" + id)
      .then((response) => {
        console.log(response.data.id);
        alert("Deleted");
        window.location.reload(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleBookUpdate = (value) => {
    console.log("Clicked", value);
    setSinglevalue(value);
    setUpdate(true);
  };

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get("http://localhost:9453/books");
        const OutData = response.data.map((book) => ({
          id: book._id,
          ...book,
        }));
        setBooks(OutData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "bookname",
      headerName: "Book Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "genre",
      headerName: "Genre",
      type: "String",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "author",
      headerName: "Author",
      flex: 1,
    },
    {
      field: "publicationYear",
      headerName: "Publication Year",
      flex: 1,
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
    },
    {
      field: "pic",
      headerName: "Image",
      flex: 1,
      renderCell: (params) => (
        <img
          src={params.row.pic}
          alt="Book"
          style={{ width: "100px", height: "100px" }}
        />
      ),
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
    },
    {
      field: "update",
      headerName: "Update",
      flex: 1,
      renderCell: (params) => (
        <IconButton
          onClick={() => handleBookUpdate(params.row)}
          color="primary"
        >
          <UpgradeIcon style={{ color: "red" }} />
        </IconButton>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      flex: 1,
      renderCell: (params) => (
        <IconButton
          onClick={() => handleBookDelete(params.row.id)}
          color="primary"
        >
          <DeleteIcon style={{ color: "red" }} />
        </IconButton>
      ),
    },
  ];
  var finalJSX = (
    <Box m="20px">
      <Header title="INFO" subtitle="List of Books" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        {loading ? (
          <Skeleton variant="rectangular" height="100%" />
        ) : (
          <DataGrid
            rows={books}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
          />
        )}
      </Box>
    </Box>
  );
  if (update) {
    console.log(singleValue)
    finalJSX = <UPDATE data={singleValue} method="put" />;
  }

  return finalJSX;
};

export default BookInfo;
