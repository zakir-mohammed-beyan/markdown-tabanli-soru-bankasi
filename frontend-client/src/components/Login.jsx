import React, { useState } from "react";
import axios from "axios";
import MarkdownRenderer from "./MarkdownRenderer";
import "./styles/Login.css";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (username.trim() !== "") {
      try {
        console.log("Attempting to login with username:", username); // Debug log
        const response = await axios.post(
          "http://localhost:5000/validate-username", // Ensure the port matches your server's port
          { username }
        );
        console.log("Server response:", response.data); // Debug log
        if (response.data.isValid) {
          onLogin(username);
        } else {
          setError("Invalid username. Please try again.");
        }
      } catch (error) {
        console.error("Error validating username:", error);
        setError("An error occurred. Please try again later.");
        if (error.response) {
          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);
          console.error("Response headers:", error.response.headers);
        } else if (error.request) {
          console.error("Request data:", error.request);
        } else {
          console.error("Error message:", error.message);
        }
      }
    }
  };

  const markdownContent = `
## Login

Please enter your username to start the quiz.
`;

  return (
    <div className="container">
      <MarkdownRenderer markdown={markdownContent} />
      <input
        type="text"
        className="input-field"
        placeholder="Please enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button className="start-button" onClick={handleLogin}>
        Start Quiz
      </button>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Login;
