import React, { useState, useContext, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { UserContext } from "../context/userContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

// Component for editing an existing post
const EditPost = () => {
  // State variables to manage form fields and potential errors
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Uncategorized");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [error, setError] = useState("");

  // Access navigation object for redirecting
  const navigate = useNavigate();

  // Fetch post ID from route parameters
  const { id } = useParams();

  // Retrieve user information and authentication token from context
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;

  // Ensure user is authenticated, redirect to login if not

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  });

  // Configuration for the ReactQuill editor
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  // Define available post categories
  const POST_CATEGORIES = [
    "Drama",
    "Comedy",
    "Thriller",
    "Horror",
    "Crime",
    "Fantasy",
    "Reality",
    "Uncategorized",
  ];

  // Fetch existing post data on component mounting
  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await axios.get(
          `https://mern-blog-backend-2zn3.onrender.com/api/posts/${id}`
        );
        setTitle(response.data.title);
        setDescription(response.data.description);
      } catch (error) {
        console.log(error);
      }
    };

    getPost();
  }, [id]);

  // Handle form submission to update the post
  const editPost = async (e) => {
    e.preventDefault();

    // Create a FormData object for sending post data
    const postData = new FormData();
    postData.set("title", title);
    postData.set("category", category);
    postData.set("description", description);
    postData.set("thumbnail", thumbnail);

    try {
      const response = await axios.patch(
        `https://mern-blog-backend-2zn3.onrender.com/api/posts/${id}`,
        postData,
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        return navigate("/"); // Redirect to home page on successful update
      }
    } catch (err) {
      setError(err.response.data.message); // Display error message from server
    }
  };

  // Render the Edit Post form
  return (
    <section className="create-post">
      <div className="container">
        <h2>Edit Post</h2>
        {error && <p className="form__error-message">{error}</p>}
        <form className="form create-post__form" onSubmit={editPost}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />
          <select
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            id=""
          >
            {POST_CATEGORIES.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
          <ReactQuill
            modules={modules}
            formats={formats}
            value={description}
            onChange={setDescription}
          />
          <input
            type="file"
            onChange={(e) => setThumbnail(e.target.files[0])}
            accept="png, jpg, jpeg"
          />
          <button type="submit" className="btn primary">
            Update
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditPost;
