import React from "react";
import { useSelector } from "react-redux";

const profilePage = (props) => {
  const username = useSelector((state) => state.auth.me.username);
  return (
    <div>
      <h3>Welcome, {username}</h3>
    </div>
  );
};

export default profilePage;
