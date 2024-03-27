import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";

const Footer = () => {
  // State for managing categories visibility and screen size
  const [showCategories, setShowCategories] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // UseEffect for handling screen resize events
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 800);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Toggle categories, triggered when the categories button is clicked
  const toggleCategories = () => {
    setShowCategories((prevShowCategories) => !prevShowCategories);
  };

  return (
    <>
      <footer
        className="sticky bottom-0 left-0 w-full bg-pink-200 pt-6 pb-6 md:pt-12 md:pb-12"
        style={{ backgroundColor: "#febbcc" }}
      >
        {/* Render categories based on screen size and visibility */}
        {isSmallScreen ? (
          <div className="flex justify-center md:justify-end">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={toggleCategories}
            >
              Categories <IoIosArrowDown className="inline-block ml-1" />
            </button>
          </div>
        ) : (
          <ul className="flex flex-col md:flex-row md:justify-center md:gap-4">
            {/* Category links for larger screens */}
            <li>
              <Link
                to="posts/categories/Drama"
                className="block md:inline-block bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Drama
              </Link>
            </li>
            <li>
              <Link
                to="posts/categories/Comedy"
                className="block md:inline-block bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Comedy
              </Link>
            </li>
            <li>
              <Link
                to="posts/categories/Thriller"
                className="block md:inline-block bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Thriller
              </Link>
            </li>
            <li>
              <Link
                to="posts/categories/Horror"
                className="block md:inline-block bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Horror
              </Link>
            </li>
            <li>
              <Link
                to="posts/categories/Crime"
                className="block md:inline-block bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Crime
              </Link>
            </li>
            <li>
              <Link
                to="posts/categories/Fantasy"
                className="block md:inline-block bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Fantasy
              </Link>
            </li>
            <li>
              <Link
                to="posts/categories/Reality"
                className="block md:inline-block bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Reality
              </Link>
            </li>
            <li>
              <Link
                to="posts/categories/Uncategorized"
                className="block md:inline-block bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Uncategorized
              </Link>
            </li>
            {/* Add more categories here */}
          </ul>
        )}

        {/* Conditionally display categories for smaller screens when expanded */}
        {isSmallScreen && showCategories && (
          <ul className="flex flex-col md:flex-row md:justify-center md:gap-4">
            {/* Category links for smaller screens */}
            <li>
              <Link
                to="posts/categories/Drama"
                className="block md:inline-block bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Drama
              </Link>
            </li>
            <li>
              <Link
                to="posts/categories/Comedy"
                className="block md:inline-block bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Comedy
              </Link>
            </li>
            <li>
              <Link
                to="posts/categories/Thriller"
                className="block md:inline-block bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Thriller
              </Link>
            </li>
            <li>
              <Link
                to="posts/categories/Horror"
                className="block md:inline-block bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Horror
              </Link>
            </li>
            <li>
              <Link
                to="posts/categories/Crime"
                className="block md:inline-block bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Crime
              </Link>
            </li>
            <li>
              <Link
                to="posts/categories/Fantasy"
                className="block md:inline-block bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Fantasy
              </Link>
            </li>
            <li>
              <Link
                to="posts/categories/Reality"
                className="block md:inline-block bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Reality
              </Link>
            </li>
            <li>
              <Link
                to="posts/categories/Uncategorized"
                className="block md:inline-block bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Uncategorized
              </Link>
            </li>
          </ul>
        )}
        <div className="text-center mt-4 md:mt-6 text-white">
          <small>All Rights Reserved &copy; Copyright, Samara Fernandes</small>
        </div>
      </footer>
    </>
  );
};

export default Footer;
