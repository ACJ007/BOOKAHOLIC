import React from "react";
import bg from './pro.jpg';
import { makeStyles } from '@mui/styles';
import {
  Card,
  CardContent,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import Homepage1 from './Homepage1';
import { useState, useEffect } from "react";
import axios from "axios";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";
import book4 from './images/book4.jpg';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: `url(${bg})`,
    minHeight: "105vh",
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    marginTop: "-3%"
  },
}));

const UserHome = () => {
  const classes = useStyles();
  const [blogs, setBlogs] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:9453/books")
      .then((response) => {
        console.log(response.data)
        const updatedBlogs = response.data.map((blog) => ({
          ...blog,
          liked: false,
        }));
        setBlogs(updatedBlogs);
      })
      .catch((err) => console.log(err));
  }, [navigate]);

  // like button
  const handleLikeButtonClick = (index) => {
    const updatedBlogs = [...blogs];
    updatedBlogs[index].liked = !updatedBlogs[index].liked;
    setBlogs(updatedBlogs);
  };

  //images

  return (
    
    <div className={classes.root}>
<Homepage1 />
      <div
        style={{
          position: "absolute",
          height: "100%",
          top: "100%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 1,
        }}
      >
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "5px",
          padding: "5vw",
          alignContent: "start",
          marginTop: "1%",
        }}
      >
        {blogs.map((value, index) => {
          return (
            
            <div
              style={{
                margin: "30px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                top: "70%",
              }}
            >
              <Card
                key={index}
                sx={{
                  maxWidth: 345,
                  margin: "10px",
                  boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.9)",
                  height: "100%",
                }}
              >
                <CardContent
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <Typography>{value.pic}</Typography>
                    <Typography gutterBottom variant="h5" component="div">
                      {value.bookname}
                    </Typography>
                    <Typography color="text.secondary" style={{fontWeight:'bolder'}}>
                      {value.author}
                    </Typography>
                  </div>
                  <br />
                  <img src = {book4} alt='#'  onClick={() => {
                  navigate("/book/" + value._id)
                }}></img>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Divider style={{ flex: "1 0 0" }} />
                    <div>
                      <IconButton
                        aria-label="add to favorites"
                        onClick={() => handleLikeButtonClick(index)}
                      >
                        <FavoriteIcon
                          color={value.liked ? "error" : "inherit"}
                        />
                      </IconButton>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserHome;
