import React, { useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const { setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Perform the side effect within useEffect
    setCurrentUser(null);
    navigate("/login");
  }, [setCurrentUser, navigate]); // Include dependencies in the dependency array if needed

  return <></>;
};

export default Logout;
