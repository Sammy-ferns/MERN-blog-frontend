import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";

const DeletePost = ({ postId: id }) => {
  // State variables
  const [isLoading, setIsLoading] = useState(false);

  // Access navigation, current location, and user information
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;

  // Redirect to login page if user is not authenticated
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  // Handle post deletion
  const removePost = async () => {
    setIsLoading(true); // Set loading state to true before making the request

    try {
      const response = await axios.delete(
        `https://mern-blog-backend-2zn3.onrender.com/api/posts/${id}`,
        {
          withCredentials: true, // Include authentication credentials
          headers: { Authorization: `Bearer ${token}` }, // Attach authentication header
        }
      );

      if (response.status === 200) {
        // If deletion successful
        // Navigate appropriately based on current location
        if (location.pathname === `/myposts/${currentUser.id}`) {
          navigate(0); // Reload the current page (using a route index of 0)
        } else {
          navigate("/"); // Redirect to the home page
        }
      }
    } catch (error) {
      console.log("Could not delete post");
    } finally {
      setIsLoading(false); // Set loading state to false even on errors
    }
  };

  // Render loading indicator or delete button
  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <button className="btn sm danger" onClick={removePost}>
          Delete
        </button>
      )}
    </div>
  );
};

export default DeletePost;
