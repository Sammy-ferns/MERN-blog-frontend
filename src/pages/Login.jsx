import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/userContext";

// Component for handling user login
const Login = () => {
  // State variables to manage user input and potential errors
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  // Access navigation object for redirecting
  const navigate = useNavigate();

  // Retrieve function to set the current user from context
  const { setCurrentUser } = useContext(UserContext);

  // Handle input changes for email and password fields
  const changeInputHandler = (e) => {
    setUserData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  // Handle form submission to log in the user
  const loginUser = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous errors
    try {
      // Send a POST request to the login API endpoint
      const response = await axios.post(
        `https://mern-blog-backend-2zn3.onrender.com/api/users/login`,
        userData
      );

      // Store the received user data in context and navigate to home
      const user = await response.data;
      setCurrentUser(user);
      navigate("/");
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  // Render the login form
  return (
    <section className="login">
      <div className="container">
        <h2>Sign In!</h2>
        <form className="form login__form" onSubmit={loginUser}>
          {error && <p className="form__error-message">{error}</p>}

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
          />
          <button type="submit" className="btn primary">
            Login
          </button>
        </form>
        <small>
          Don't have an account? <Link to="/register">Sign up</Link>
        </small>
      </div>
    </section>
  );
};

export default Login;
