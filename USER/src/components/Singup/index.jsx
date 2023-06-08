import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

const Signup = () => {
  const [data, setData] = useState({
    name: "",
    place: "",
    age: "",
    phone: "",
    education: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCheckboxChange = () => {
    setIsChecked((prevChecked) => !prevChecked);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isChecked) {
      setError("Please accept the terms and conditions.");
      return;
    }

    if (data.password !== data.confirmPassword) {
      setError("Password and confirm password do not match.");
      return;
    }

    setError("");

    try {
      const response = await axios.post("http://localhost:9453/register", data);
      console.log(response.data);
      if (response.data.status === "ok") {
        alert("Registration successful. Please login.");
        window.localStorage.setItem("token", response.data.data);
        window.location.href = "/userlogin";
      } else if (response.data.status === "User Exists") {
        alert("Invalid email. Please check your email.");
      } else if (response.status === "User Exists") {
        alert("User already exists. Please login.");
      }
    } catch (error) {
      console.log(error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className={styles.signup_container}>
      <div className={styles.signup_form_container}>
        <div className={styles.left}>
          <h1>Welcome Back</h1>
          <Link to="/login">
            <button type="button" className={styles.white_btn}>
              Sign in
            </button>
          </Link>
        </div>
        <div className={styles.right}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Create Account</h1>
            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={handleChange}
              value={data.name}
              required
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Place"
              name="place"
              onChange={handleChange}
              value={data.place}
              required
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Age"
              name="age"
              onChange={handleChange}
              value={data.age}
              required
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Education"
              name="education"
              onChange={handleChange}
              value={data.education}
              required
              className={styles.input}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className={styles.input}
            />
            <input
              type="number"
              placeholder="Phone Number"
              name="phone"
              onChange={handleChange}
              value={data.phone}
              required
              className={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className={styles.input}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              onChange={handleChange}
              value={data.confirmPassword}
              required
              className={styles.input}
            />
            <div>
              <label>
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
                I accept the terms and conditions
              </label>
            </div>
            {error && <div className={styles.error_msg}>{error}</div>}
            <button type="submit" className={styles.green_btn}>
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
