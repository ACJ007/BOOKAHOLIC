import React from "react";
import "./landingpage.css";
import library from "../media/library.mp4";
import { Link } from "react-router-dom";
const Landingpage = () => {
  return (
    <div className="landingpage">
      <video src={library} autoPlay muted loop class="video-bg" />
      <div className="bg-overlay"></div>
      <div className="home-text">
        <h1>WELCOME</h1>
        <p4>everything you needed is here</p4>

        <div className="button-container">
          <button className="button primary-button">
            <Link
              to={"/login"}
              style={{ textDecoration: "none", color: "white" }}
            >
              Sign in
            </Link>
          </button>
          <button className="button secondary-button">
            <Link
              to={"/signup"}
              style={{ textDecoration: "none", color: "white" }}
            >
              Sign up
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Landingpage;
