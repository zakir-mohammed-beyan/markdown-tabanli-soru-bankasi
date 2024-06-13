// Login.js
import React, { useState } from "react";
import axios from "axios";
import MarkdownRenderer from "./MarkdownRenderer";
import "./styles/Login.css";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setError(""); // Clear previous errors
    if (username.trim() !== "") {
      try {
        setIsLoading(true);
        const response = await axios.post("http://localhost:5000/validate-username", { username });
        if (response.data.isValid) {
          onLogin(username); // Pass the username to the parent component
          setUsername(""); // Clear input on success
        } else {
          setError("Invalid username. Please try again.");
        }
      } catch (error) {
        setError("An error occurred. Please try again later.");
        console.error("Error validating username:", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setError("Username cannot be empty.");
    }
  };

  const markdownContent = `
  # Login
  **Please enter your username to start the quiz.**
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
        aria-label="Username"
      />
      <button
        className="start-button"
        onClick={handleLogin}
        disabled={isLoading}
        aria-label="Start Quiz"
      >
        {isLoading ? "Loading..." : "Start Quiz"}
      </button>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Login;
