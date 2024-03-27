import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  // Renders a generic error page when a route is not found

  return (
    <section className="error-page">
      <div className="center">
        {/* Provide a button to navigate back to the home page */}
        <Link to="/" className="btn primary">
          Go Back Home
        </Link>
        <h2>Page Not Found</h2>
      </div>
    </section>
  );
};

export default ErrorPage;
