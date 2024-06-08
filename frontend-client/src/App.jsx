import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, useParams } from "react-router-dom"; // Import useParams
import "./App.css";
import MarkdownRenderer from "./components/MarkdownRenderer";
import Login from "./components/Login";
import SubmitSuccess from "./components/SubmitSuccess";
import CategorySelection from "./components/CategorySelection";
import { questions } from "./components/Questions";

const App = () => {
  const [selectedOptions, setSelectedOptions] = useState(Array(30).fill(null));
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleCheckboxClick = (questionIndex, optionIndex) => {
    const newSelectedOptions = [...selectedOptions];
 
    newSelectedOptions[questionIndex] = newSelectedOptions[questionIndex] === optionIndex ? null : optionIndex;
    setSelectedOptions(newSelectedOptions);
  };
  

  const handleLogin = (username) => {
    setIsLoggedIn(true);
  };

  const handleSubmitQuiz = () => {
    const answeredCount = selectedOptions.filter((option) => option !== null)
      .length;

    if (answeredCount < 2) {
      alert("You must answer at least 2 questions to submit the quiz.");
    } else {
      const confirmed = window.confirm(
        "Are you sure you want to submit the quiz?"
      );
      if (confirmed) {
        window.location.href = "/submit-success";
      }
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
            element={<QuizPage selectedOptions={selectedOptions} handleCheckboxClick={handleCheckboxClick} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

const QuizPage = ({ selectedOptions, handleCheckboxClick }) => {
  const { category, difficulty } = useParams();

  let markdownContent;
  if (questions[category] && questions[category][difficulty]) {
    markdownContent = questions[category][difficulty];
  } else {
    markdownContent = "";
  }

  const handleSubmitQuiz = () => { 
    const answeredCount = selectedOptions.filter((option) => option !== null)
      .length;

    if (answeredCount < 2) {
      alert("You must answer at least 2 questions to submit the quiz.");
    } else {
      const confirmed = window.confirm(
        "Are you sure you want to submit the quiz?"
      );
      if (confirmed) {
        window.location.href = "/submit-success";
      }
    }
  };

  return (
    <div className="centered-content">
      <MarkdownRenderer
        markdown={markdownContent}
        handleCheckboxClick={handleCheckboxClick}
        selectedOptions={selectedOptions}
      />
      <button className="submit-button" onClick={handleSubmitQuiz}>
        Submit Quiz
      </button>
    </div>
  );
};

export default App;
