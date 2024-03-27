import React, { useState, useEffect } from "react";
import PostItem from "../components/PostItem";
import Loader from "../components/Loader";
import axios from "axios";
import { useParams } from "react-router-dom";

const CategoryPosts = () => {
  // State to store fetched posts data for the current category
  const [posts, setPosts] = useState([]);
  // State to manage loading state
  const [isLoading, setIsLoading] = useState(false);

  // Extract category name from URL parameters using useParams hook
  const { category } = useParams();

  // Fetch posts for the specified category on component mount and whenever the category changes
  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://mern-blog-backend-2zn3.onrender.com/api/posts/categories/${category}`
        );
        setPosts(response?.data);
      } catch (err) {
        console.error(err);
      }
      setIsLoading(false);
    };

    fetchPosts();
  }, [category]);

  // Render loading indicator while data is being fetched
  if (isLoading) {
    return <Loader />;
  }

  // Render post content or a message if no posts found in the category
  return (
    <section className="posts">
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

export default CategoryPosts;
