import { Box, Skeleton, IconButton } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../components/Header";
import BlockIcon from "@mui/icons-material/Block";
import DeleteIcon from "@mui/icons-material/Delete";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleUserBlock = async (data) => {
    if (data.access) {
      await axios
        .put("http://localhost:9453/user/access/b/" + data.id)
        .then((response) => {
          console.log(response.data);
          alert("Blocked");
          window.location.reload(false);
        });
    } else {
      await axios
        .put("http://localhost:9453/user/access/u/" + data.id)
        .then((response) => {
          console.log(response.data);
          alert("UnBlocked");
          window.location.reload(false);
        });
    }
  };
  const handleUserUnblock_ = (id) => {
    console.log("User Blocked" + id);
    axios
      .unblock("http://localhost:9453/user/access/u/:id" + id)
      .then((response) => {
        console.log(response.id.value);
        alert("Unblocked");
        window.location.reload(false);
      });
  };

  const handleUserDelete = (id) => {
    console.log("User Deleted" + id);
    axios
      .delete("http://localhost:9453/userdelete/" + id)
      .then((response) => {
        console.log(response.data);
        alert("Deleted");
        window.location.reload(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.get("http://localhost:9453/viewuser");
        const OutData = res.data.map((user) => ({ id: user._id, ...user }));
        setUsers(OutData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, []);

  const columns = [
    { field: "_id", headerName: "ID", flex: 1 },

    {
      field: "Name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "education",
      headerName: "Education",
      flex: 1,
    },
    {
      field: "place",
      headerName: "Place",
      flex: 1,
    },
    {
      field: "block",
      headerName: "Block",
      flex: 1,
      renderCell: (params) => (
        <IconButton onClick={() => handleUserBlock(params.row)} color="primary">
          {!params.row.access ? (
            <PlayCircleIcon style={{ color: "red" }} />
          ) : (
            <BlockIcon style={{ color: "red" }} />
          )}
        </IconButton>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      flex: 1,
      renderCell: (params) => (
        <IconButton
          onClick={() => handleUserDelete(params.row.id)}
          color="primary"
        >
          <DeleteIcon style={{ color: "red" }} />
        </IconButton>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="USER INFO" subtitle="List of Users that have accounts" />
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
            rows={users}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
          />
        )}
      </Box>
    </Box>
  );
};

export default Contacts;
