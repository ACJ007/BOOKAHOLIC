import React, { useState } from 'react';
import { Grid, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import bg from './pro.jpg';
import { Link } from 'react-router-dom';
import Homepage1 from "./Homepage1";


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: `url(${bg})`,
    minHeight: "105vh",
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    marginTop: "-3%"
  },
  avatar: {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    objectFit: 'cover',
    cursor: 'pointer',
  },
  fileInput: {
    display: 'none',
  },
}));

const EditPro = () => {
  const classes = useStyles();

  const [user, setUser] = useState({
    name: '',
    email: '',
    avatar: 'https://i.ibb.co/DWxKz89/ava-removebg-preview.png'
  });

  const handleLogout = () => {
    // Code to handle logout
    // Redirect user or perform other actions
  };

  const handleProfileUpdate = () => {
    // Code to handle profile update
    // Redirect user to profile edit page or perform other actions
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setUser((prevUser) => ({
        ...prevUser,
        avatar: reader.result,
      }));
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={classes.root}>
     <Homepage1/>
      <div className="profile-container">
        <br /><br /><br />
        <h2>Profile Page</h2>
        <div className="profile-card">
          <label htmlFor="avatar" className={classes.avatarContainer}>
            <img className={classes.avatar} src={user.avatar} alt="Avatar" />
            <input
              id="avatar"
              className={classes.fileInput}
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
            />
          </label>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="First Name"
                name="firstName"
                type="text"
                required
                style={{ margin: 5 }}
              />
              <TextField
                label="Last Name"
                name="lastName"
                type="text"
                required
                style={{ margin: 5 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Age"
                name="age"
                type="number"
                required
                style={{ margin: 5 }}
              />
              <TextField
                label="Place"
                name="place"
                type="text"
                required
                style={{ margin: 5 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Address"
                name="address"
                type="text"
                required
                className="fixed-width-textfield"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Phone Number"
                name="phoneNumber"
                type="number"
                required
                style={{ margin: 5 }}
              />
              <TextField
                label="Email"
                name="email"
                type="email"
                required
                style={{ margin: 5 }}
              />
            </Grid>
          </Grid>
          <br />
     
        <div className="profile-buttons">
        <Link to={"/pro"} style={{color : "white"}}>   <button className="edit-button1" onClick={handleProfileUpdate}>SAVE</button></Link>
        </div>
        </div>
      </div>
    </div>
  );
};

export default EditPro;
