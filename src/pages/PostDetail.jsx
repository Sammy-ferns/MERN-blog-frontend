import React, { useEffect, useContext, useState } from "react";
import PostAuthor from "../components/PostAuthor";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../context/userContext";
import Loader from "../components/Loader";
import DeletePost from "../pages/DeletePost";
import axios from "axios";

const PostDetail = () => {
  // Retrieve post ID from route parameters
  const { id } = useParams();
  // State variables to manage post data, potential errors, and loading state
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Access current user information from context
  const { currentUser } = useContext(UserContext);

  // Fetch post data on component mounting
  useEffect(() => {
    const getPost = async () => {
      setIsLoading(true); // Set loading state to true before fetching
      try {
        const response = await axios.get(
          `https://mern-blog-backend-2zn3.onrender.com/api/posts/${id}`
        );
        setPost(response.data); // Update state with received post data
      } catch (error) {
        setError(error); // Set error state in case of API errors
      }
      setIsLoading(false); // Set loading state to false after the request
    };

    getPost();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  // Render post details if available, or an error message if applicable
  return (
    <section className="post-detail">
      {error && <p className="error">{error}</p>}
      {post && (
        <div className="container post-detail__container">
          <div className="post-detail__header">
            <PostAuthor authorID={post.creator} createdAt={post.createdAt} />
            {currentUser?.id == post?.creator && (
              <div className="post-detail__buttons">
                <Link
                  to={`/posts/${post?._id}/edit`}
                  className="btn sm primary"
                >
                  Edit
                </Link>
                <DeletePost postId={id} />
              </div>
            )}
          </div>
          <h1>{post.title}</h1>
          <div className="post-detail__thumbnail">
            <img
              src={`https://mern-blog-backend-2zn3.onrender.com/uploads/${post.thumbnail}`}
              alt=""
            />
          </div>
          <p dangerouslySetInnerHTML={{ __html: post.description }}></p>
        </div>
      )}
    </section>
  );
};

export default PostDetail;
