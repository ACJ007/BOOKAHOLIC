import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import bg from "./pro.jpg";
import { makeStyles } from "@mui/styles";
import Homepage1 from "./Homepage1";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: `url(${bg})`,
    minHeight: "105vh",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    marginTop: "-3%",
  },
}));

const UsePro = () => {
  const classes = useStyles();
  const [user, setUser] = useState({
    name: "",
    email: "",
    avatar:
      "https://rosieshouse.org/wp-content/uploads/2016/06/avatar-large-square.jpg",
  });

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
  const handleLogout = () => {
    // Code to handle logout
    // Redirect user or perform other actions
  };

  const handleProfileUpdate = () => {
    // Code to handle profile update
    // Redirect user to profile edit page or perform other actions
  };

  return (
    <div className={classes.root}>
      <div className="profile-container">
        <Homepage1 />
        <br />
        <br />
        <br />

        <div className="profile-card">
          
        <h2>PROFILE PAGE</h2>
        <br />
          <img
            className="avatar"
            src={
              "https://rosieshouse.org/wp-content/uploads/2016/06/avatar-large-square.jpg"
            }
            alt="Avatar"
          />
          <h2>Name: {user.Name}</h2>
          <h4>Email: {user.email}</h4>
          <h3>Place: {user.place}</h3>
          <h3>Age: {user.age}</h3>
          <h3>Education: {user.education}</h3>
          <h3>Phone: {user.phone}</h3>

          <div className="profile-buttons">
            <Link to={"/edit"}>
              {" "}
              <button className="edit-button" onClick={handleProfileUpdate}>
                Edit Profile
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsePro;
