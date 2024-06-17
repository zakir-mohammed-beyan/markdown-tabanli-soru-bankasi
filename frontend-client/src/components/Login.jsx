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
    setError(""); 
    if (username.trim() !== "") {
      try {
        setIsLoading(true);
        const response = await axios.post("http://localhost:5000/validate-username", { username });
        if (response.data.isValid) {
          onLogin(username); 
          setUsername(""); 
        } else {
          setError("Geçersiz kullanıcı adı. Lütfen tekrar deneyin.");
        }
      } catch (error) {
        setError("Bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.");
        console.error("Kullanıcı adı doğrulanırken hata oluştu:", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setError("Kullanıcı adı boş olamaz.");
    }
  };

  const markdownContent = `
  # Giriş yapın
  **Sınavı başlatmak için lütfen doğru kullanıcı adınızı girin.**
  `;

  return (
    <div className="container">
      <MarkdownRenderer markdown={markdownContent} />
      <input
        type="text"
        className="input-field"
        placeholder="Lütfen kullanıcı adınızı girin"
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
        {isLoading ? "Yükleniyor..." : "Sınav başlat"}
      </button>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Login;
