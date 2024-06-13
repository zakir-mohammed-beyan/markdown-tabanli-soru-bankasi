import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import QuizPage from "./components/QuizPage";
import Login from "./components/Login";
import CategorySelection from "./components/CategorySelection";
import { questions } from "./components/Questions";
import QuizResult from "./components/QuizResult.jsx";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  const handleLogin = (username) => {
    setIsLoggedIn(true);
    setUsername(username);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
  };

  return (
    <Router>
      <div className="main-container">
        <Routes>
          <Route
            path="/"
            element={
              !isLoggedIn ? (
                <div className="centered-content">
                  <Login onLogin={handleLogin} />
                </div>
              ) : (
                <div className="centered-content">
                  <CategorySelection />
                </div>
              )
            }
          />
          <Route
            path="/quiz/:category/:difficulty"
            element={
              <QuizPage
                questions={questions}
                username={username}
              />
            }
          />
          <Route
            path="/quiz-result"
            element={<QuizResult onLogout={handleLogout} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
