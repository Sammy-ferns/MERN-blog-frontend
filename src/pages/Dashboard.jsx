import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/userContext";
import axios from "axios";
import Loader from "../components/Loader";
import DeletePost from "../pages/DeletePost";

const Dashboard = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch user ID from URL parameters
  const { id } = useParams();

  // Access current user information and authentication token
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;

  //Redirect to login page if user is not logged in

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  // Fetch posts created by the specified user
  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true); // Set loading state to true before fetching
      try {
        const response = await axios.get(
          `https://mern-blog-backend-2zn3.onrender.com/api/posts/users/${id}`,
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` }, // Include authentication header
          }
        );
        setPosts(response.data); // Update posts state with fetched data
      } catch (error) {
        console.log(error);
      }

      setIsLoading(false); // Set loading state to false even on errors
    };

    fetchPosts();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  // Render the dashboard content
  return (
    <section className="dashboard">
      {posts.length ? (
        <div className="container dashboard__container">
          {posts.map((post) => {
            // Render a post card for each fetched post
            return (
              <article key={post.id} className="dashboard__post">
                <div className="dashboard__post-info">
                  <div className="dashboard__post-thumbnail">
                    <img
                      src={`https://mern-blog-backend-2zn3.onrender.com/uploads/${post.thumbnail}`}
                      alt=""
                    />
                  </div>
                  <h5>{post.title}</h5>
                </div>
                <div className="dashboard__post-actions">
                  <Link to={`/posts/${post._id}`} className="btn sm">
                    View
                  </Link>
                  <Link
                    to={`/posts/${post._id}/edit`}
                    className="btn sm primary"
                  >
                    Edit
                  </Link>
                  <DeletePost postId={post._id} />
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        // Display a message if no posts are found
        <h2 className="center">No posts yet</h2>
      )}
    </section>
  );
};

export default Dashboard;
