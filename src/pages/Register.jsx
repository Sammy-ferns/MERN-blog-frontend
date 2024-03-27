import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  // State variables to manage user input and potential errors
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const [error, setError] = useState("");

  // Access navigation object for redirecting
  const navigate = useNavigate();

  // Handle input changes for user registration form
  const changeInputHandler = (e) => {
    setUserData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  // Handle form submission to register a new user
  const registerUser = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous errors
    try {
      // Send a POST request to the user registration API endpoint
      const response = await axios.post(
        `https://mern-blog-backend-2zn3.onrender.com/api/users/register`,
        userData
      );
      const newUser = await response.data;
      console.log(newUser); // For debugging purposes (can be removed)

      // Handle successful registration or potential errors
      if (!newUser) {
        setError("An error occurred while registering user, please try again");
      }
      navigate("/login"); // Redirect to login page after successful registration
    } catch (err) {
      // Display error message from the server in case of API errors
      setError(err.response.data.message);
    }
  };

  // Render the user registration form
  return (
    <section className="register">
      <div className="container">
        <h2>Sign Up!</h2>
        <form className="form register__form" onSubmit={registerUser}>
          {error && <p className="form__error-message">{error}</p>}
          <input
            type="text"
            placeholder="Full name"
            name="name"
            value={userData.name}
            onChange={changeInputHandler}
            autoFocus
          />
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={userData.email}
            onChange={changeInputHandler}
            autoFocus
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={userData.password}
            onChange={changeInputHandler}
            autoFocus
          />
          <input
            type="password"
            placeholder="Confirm password"
            name="password2"
            value={userData.password2}
            onChange={changeInputHandler}
            autoFocus
          />
          <button type="submit" className="btn primary">
            Register
          </button>
        </form>
        <small>
          Already have an account? <Link to="/login">Sign in</Link>
        </small>
      </div>
    </section>
  );
};

export default Register;
