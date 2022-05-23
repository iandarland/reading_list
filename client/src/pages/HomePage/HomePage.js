import React from "react";
import "./HomePage.css";

export const HomePage = () => {
  return (
    <div className="welcome-search">
        <div className="welcome-form">
            <h1>The Reading List</h1>
            <form>
                <input type="text"></input>
                <button type="submit">Search</button>
            </form>
        </div>
    </div>
  );
};
