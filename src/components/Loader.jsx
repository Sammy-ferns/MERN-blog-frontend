import React from "react";

const Loader = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-50 bg-gray-opacity-50 flex items-center justify-center">
      <div className="loader__image w-20 h-20 rounded-full bg-white shadow-md">
        <iframe
          src="https://giphy.com/embed/3o7bu8sRnYpTOG1p8k"
          width="100%"
          height="100%"
          style={{ position: "absolute" }}
          frameBorder="0"
          className="giphy-embed"
          allowFullScreen
          title="Giphy Embed"
        ></iframe>
      </div>
      <p>
        <a href="https://giphy.com/gifs/pizza-loading-snacks-3o7bu8sRnYpTOG1p8k">
          via GIPHY
        </a>
      </p>
    </div>
  );
};

export default Loader;
