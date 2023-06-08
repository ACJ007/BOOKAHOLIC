import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const SingleView = () => {
  const [book, setBook] = useState();
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [rented, setRented] = useState(false);
  const [user, setUser] = useState({
    Name: "",
    email: "",
  });

  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:9453/singlebook/${id}`)
      .then((response) => {
        console.log(response.data);
        setBook(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    getData();
  }, []);
  async function getData() {
    var token = localStorage.getItem("token");
    const response = await axios.get(
      "http://localhost:9453/singleuser/" + token
    );
    setUser(response.data);
  }

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleCommentSubmit = () => {
    const newComment = {
      id: comments.length + 1,
      content: comment,
      author: user.Name,
    };
    setComments([...comments, newComment]);
    setComment("");
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  const handleRentButtonClick = () => {
    setRented(!rented);
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(to bottom, limegreen, #d0ff00)",
        minHeight: "92vh",
        padding: "40px",
      }}
    >
      <Stack direction="row" spacing={4}>
        <Card
          sx={{
            maxWidth: "65%",
            boxShadow: "0px 2px 6px rgb(0, 0, 0)",
            height: "44rem",
            display: "flex",
            opacity: 0.9,
            backgroundColor: "black",
          }}
        >
          <CardContent
            sx={{
              marginTop: "8px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              fontFamily: "monospace",
              color: "white",
            }}
          >
            <Typography
              variant="h3"
              sx={{ fontFamily: "fantasy", color: "white" }}
            >
              {book.bookname}
            </Typography>
            <br />
            <br />
            <Typography variant="h5">Author: {book.author}</Typography>
            <Typography sx={{ fontFamily: "monospace", color: "white" }}>
              ISBN: {book.isbn}
            </Typography>
            <Typography
              sx={{ fontSize: "25px", fontFamily: "fantasy", color: "white" }}
            >
              Publication Year: {book.publicationYear}
            </Typography>
            <Typography
              sx={{ fontSize: "25px", fontFamily: "fantasy", color: "white" }}
            >
              Genre: {book.genre}{" "}
            </Typography>
            <Typography
              sx={{
                fontSize: "25px",
                fontFamily: "cursive",
                color: "whitesmoke",
              }}
            >
              Description: {book.description}
            </Typography>
            <Box sx={{ marginTop: "auto" }}>
              <Stack direction="row" spacing={2}>
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "white", color: "black" }}
                  onClick={handleRentButtonClick}
                >
                  {rented ? "Return" : "Rent"}
                </Button>
              </Stack>
            </Box>
          </CardContent>
        </Card>
        <Card
          sx={{
            maxWidth: "30%",
            marginTop: "5px",
            height: "40rem",
            display: "flex",
            flexDirection: "column",
            position: "sticky",
            top: "40px",
          }}
        >
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              fontFamily: "monospace",
              color: "black",
            }}
          >
            <Box
              sx={{
                height: 550,
              }}
            >
              <Typography variant="h5">Comments</Typography>
              <Box
                sx={{
                  flexGrow: 1,
                  overflowY: "scroll",
                  marginBottom: "10px",
                }}
              >
                {comments.map((comment) => (
                  <Box
                    key={comment.id}
                    sx={{ display: "flex", marginBottom: "10px" }}
                  >
                    <Avatar alt={comment.author} src="/avatar.png" />
                    <Box
                      sx={{
                        background: "#f2f2f2",
                        padding: "10px",
                        marginLeft: "10px",
                        borderRadius: "10px",
                      }}
                    >
                      <Typography variant="caption">
                        {comment.author}
                      </Typography>
                      <Typography>{comment.content}</Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
            <Box sx={{ display: "flex", alignItems: "end" }}>
              <Avatar
                alt={user.Name}
                src="/avatar.png"
                sx={{ marginRight: "10px" }}
              />
              <TextField
                value={comment}
                onChange={handleCommentChange}
                label="Add a comment"
                variant="outlined"
                fullWidth
              />
              <Button onClick={handleCommentSubmit}>Send</Button>
            </Box>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
};

export default SingleView;
