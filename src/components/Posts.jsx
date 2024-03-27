import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import PostItem from "./PostItem";
import axios from "axios";

const Posts = () => {
  // State to store fetched posts data
  const [posts, setPosts] = useState([]);
  // State to manage loading state
  const [isLoading, setIsLoading] = useState(false);

  // Fetches posts on component mount
  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "https://mern-blog-backend-2zn3.onrender.com/api/posts"
        );
        setPosts(response?.data);
      } catch (err) {
        console.error(err);
      }
      setIsLoading(false);
    };

    fetchPosts();
  }, []);

  // Display loader while data is being fetched
  if (isLoading) {
    return <Loader />;
  }
  return (
    <section className="posts">
      {/* Conditionally render post content or no posts message */}
      {posts && posts.length > 0 ? (
        <div className="container posts__container">
          {/* Map through posts array and render PostItem component for each post */}
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

export default Posts;
