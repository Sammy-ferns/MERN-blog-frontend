import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";

const Authors = () => {
  // State to store fetched author data
  const [authors, setAuthors] = useState([]);
  // State to manage loading state
  const [isLoading, setIsLoading] = useState(false);

  // Fetch authors on component mount
  useEffect(() => {
    const getAuthors = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://mern-blog-backend-2zn3.onrender.com/api/users`
        );
        setAuthors(response?.data);
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    };

    getAuthors();
  }, []); // Empty dependency array to run effect only once

  // Render loading indicator while data is being fetched
  if (isLoading) {
    return <Loader />;
  }

  // Render author cards or a message if no authors found
  return (
    <section className="authors">
      {authors.length > 0 ? (
        <div className="container authors__container">
          {authors.map(({ _id: id, avatar, name, posts }) => {
            // Render an author card for each author
            return (
              <Link key={id} to={`/posts/users/${id}`} className="author">
                <div className="author__avatar">
                  <img
                    src={`https://mern-blog-backend-2zn3.onrender.com/uploads/${avatar}`}
                    alt={`${name}`}
                  />
                </div>
                <div className="author__info">
                  <h4>{name}</h4>
                  <p>{posts}</p>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <h2 className="center">No authors found</h2>
      )}
    </section>
  );
};

export default Authors;
