import React from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import "./styles/QuizResult.css";

const QuizResult = ({ onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { answers, category, difficulty, username, timeTaken } = location.state || {};

  // If any state value is missing, show the message
  if (!answers || !category || !difficulty || !username) {
    return <div>No quiz results to display.</div>;
  }

  // Load questions
  const questions = require("./Questions").questions;

  // Check if questions exist for the given category and difficulty
  if (!questions[category] || !questions[category][difficulty]) {
    return <div>Invalid category or difficulty.</div>;
  }

  const rawQuestionsText = questions[category][difficulty];
  
  // Check if rawQuestionsText is defined and not empty
  if (!rawQuestionsText) {
    return <div>No questions available for the selected category and difficulty.</div>;
  }

  const rawQuestions = rawQuestionsText
    .trim()
    .split("\n####")
    .filter((q) => q)
    .map((q) => q.trim().split("\n"));

  let correctCount = 0;
  rawQuestions.forEach((question, index) => {
    const correctAnswerLine = question.find(line => line.startsWith("answer:"));
    if (!correctAnswerLine) {
      console.error(`No answer found for question ${index + 1}`);
      return;
    }
    const correctAnswerIndex = parseInt(correctAnswerLine.split(" ")[1]) - 1;
    if (answers[index] === correctAnswerIndex) {
      correctCount++;
    }
  });

  const score = ((correctCount / rawQuestions.length) * 100).toFixed(2);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}h ${minutes}m ${secs}s`;
  };

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  return (
    <div className="result-container">
      <h1>Quiz Result</h1>
      <h2>Username: {username}</h2>
      <p>Category: {category}</p>
      <p>Difficulty: {difficulty}</p>
      <p>
        Score: {correctCount} out of {rawQuestions.length} ({score}%)
      </p>
      <p>Time Taken: {formatTime(timeTaken)}</p>
      {correctCount === rawQuestions.length && (
        <p className="congratulations-message">Congratulations! You got a perfect score!</p>
      )}
      <p>Do you want to try again? <Link to="/category-selection">here</Link>.</p> 
      <button className="logout-button" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default QuizResult;
