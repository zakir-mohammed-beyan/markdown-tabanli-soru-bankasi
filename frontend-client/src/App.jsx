import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import QuizPage from "./components/QuizPage";
import Login from "./components/Login";
import SubmitSuccess from "./components/SubmitSuccess";
import CategorySelection from "./components/CategorySelection";
import { questions } from "./components/Questions";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleSubmitQuiz = (event, answers) => {
    event.preventDefault();
    const answeredCount = Object.keys(answers).length;

    if (answeredCount < 2) {
      alert("You must answer at least 2 questions to submit the quiz.");
      return;
    }

    const confirmed = window.confirm("Are you sure you want to submit the quiz?");
    if (confirmed) {
      console.log("Submitted answers:", answers);
      window.location.href = "/submit-success";
    }
  };

  return (
    <Router>
      <div className="main-container">
        <Routes>
          <Route path="/submit-success" element={<SubmitSuccess />} />
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
                handleSubmitQuiz={handleSubmitQuiz}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
