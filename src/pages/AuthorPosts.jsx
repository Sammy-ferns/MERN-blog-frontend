import React, { useState, useEffect } from "react";
import PostItem from "../components/PostItem";
import Loader from "../components/Loader";
import axios from "axios";
import { useParams } from "react-router-dom";

const AuthorPosts = () => {
  // State to store fetched posts data
  const [posts, setPosts] = useState([]);
  // State to manage loading state
  const [isLoading, setIsLoading] = useState(false);

  // Extract author ID from URL parameters
  const { id } = useParams();

  // Fetch posts on component mount and when author ID changes
  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://mern-blog-backend-2zn3.onrender.com/api/posts/users/${id}`
        );
        setPosts(response?.data);
      } catch (err) {
        console.error(err);
      }
      setIsLoading(false);
    };

    fetchPosts();
  }, [id]);

  // Render loading indicator while data is being fetched
  if (isLoading) {
    return <Loader />;
  }

  // Render post content or a message if no posts found
  return (
    <section className="posts">
      {posts && posts.length > 0 ? (
        <div className="container posts__container">
          {posts.map(
            ({
              _id: id,
              thumbnail,
              category,
              title,
              description,
              creator,
              createdAt,
            }) => (
              <PostItem
                key={id}
                postID={id}
                thumbnail={thumbnail}
                category={category}
                title={title}
                description={description}
                authorID={creator}
                createdAt={createdAt}
              />
            )
          )}
        </div>
      ) : (
        <h2 className="center">No posts found</h2>
      )}
    </section>
  );
};

export default AuthorPosts;
