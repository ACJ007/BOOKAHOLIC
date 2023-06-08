import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { TextField, Button, Container } from "@mui/material";
import axios from "axios";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "#141B2D",
    padding: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "90vh",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    "& > *": {
      margin: theme.spacing(1),
      width: "300px",
    },
  },
  input: {
    color: "#FFF",
  },
  uploadButton: {
    marginTop: theme.spacing(1),
    backgroundColor: "#58B8BB",
    color: "#FFF",
  },
  addButton: {
    backgroundColor: "#58B8BB",
    color: "#FFF",
  },
}));

const AddBookForm = (props) => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    isbn: "",
    bookname: "",
    genre: "",
    author: "",
    publicationYear: "",
    description: "",
    photo: null,
  });

  useEffect(() => {
    if (props.data) {
      setFormData(props.data);
    }
  }, [props.data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePhotoChange = (e) => {
    const photoFile = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData((prevState) => ({
        ...prevState,
        photo: reader.result,
      }));
    };

    if (photoFile) {
      reader.readAsDataURL(photoFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { isbn, bookname, genre, author, publicationYear, description, photo } = formData;

    const requestData = {
      isbn,
      bookname,
      genre,
      author,
      publicationYear,
      description,
      photo,
    };

    if (props.method === "post") {
      try {
        const response = await axios.post(`http://localhost:9453/createbook`, requestData);

        if (response.status === 200) {
          setFormData({
            isbn: "",
            bookname: "",
            genre: "",
            author: "",
            publicationYear: "",
            description: "",
            photo: null,
          });
        } else {
          console.log("Error adding book");
        }
      } catch (error) {
        console.log("Error:", error);
      }
    }else if (props.method === "put") {
      try {
        console.log(formData)
        console.log(SERVER_URL)
        const response = await axios.put(`http://localhost:9453/update/${props.data._id}`, formData);
        alert("Updated");
        window.location.reload(false);
      } catch (error) {
        console.log("Error:", error);
      }
    } else {
      try {
        const response = await axios.post(`http://localhost:9453/createbook`, requestData);

        if (response.status === 200) {
          setFormData({
            isbn: "",
            bookname: "",
            genre: "",
            author: "",
            publicationYear: "",
            description: "",
            photo: null,
          });
        } else {
          console.log("Error adding book");
        }
      } catch (error) {
        console.log("Error:", error);
      }
    }
  };

  return (
    <Container className={classes.container}>
      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField
          label="ISBN"
          variant="outlined"
          name="isbn"
          value={formData.isbn}
          onChange={handleChange}
          InputLabelProps={{
            style: { color: "white" },
          }}
          InputProps={{
            className: classes.input,
          }}
        />
        <TextField
          label="Book Name"
          variant="outlined"
          name="bookname"
          value={formData.bookname}
          onChange={handleChange}
          InputLabelProps={{
            style: { color: "white" },
          }}
          InputProps={{
            className: classes.input,
          }}
        />
        <TextField
          label="Genre"
          variant="outlined"
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          InputLabelProps={{
            style: { color: "white" },
          }}
          InputProps={{
            className: classes.input,
          }}
        />
        <TextField
          label="Author"
          variant="outlined"
          name="author"
          value={formData.author}
          onChange={handleChange}
          InputLabelProps={{
            style: { color: "white" },
          }}
          InputProps={{
            className: classes.input,
          }}
        />
        <TextField
          label="Publication Year"
          variant="outlined"
          name="publicationYear"
          value={formData.publicationYear}
          onChange={handleChange}
          InputLabelProps={{
            style: { color: "white" },
          }}
          InputProps={{
            className: classes.input,
          }}
        />
        <TextField
          label="Description"
          variant="outlined"
          name="description"
          value={formData.description}
          onChange={handleChange}
          InputLabelProps={{
            style: { color: "white" },
          }}
          InputProps={{
            className: classes.input,
          }}
        />
       
        <Button
          variant="contained"
          color="primary"
          type="submit"
          className={classes.addButton}
        >
          Add Book
        </Button>
      </form>
    </Container>
  );
};

export default AddBookForm;
