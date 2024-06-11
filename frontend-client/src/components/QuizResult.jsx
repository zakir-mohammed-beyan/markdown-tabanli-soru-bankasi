import React from "react";
import { useLocation, Link } from "react-router-dom";
import "./styles/QuizResult.css";

const QuizResult = () => {
  const location = useLocation();
  const { answers, category, difficulty, username } = location.state || {};
  const questions = require("./Questions").questions;

  if (!answers || !category || !difficulty || !username) {
    return <div>No quiz results to display.</div>;
  }

  // Check if questions exist for the given category and difficulty
  if (!questions[category] || !questions[category][difficulty]) {
    return <div>Invalid category or difficulty.</div>;
  }

  const rawQuestions = questions[category][difficulty]
    .trim()
    .split("\n####")
    .filter((q) => q)
    .map((q) => q.trim().split("\n"));

  console.log("rawQuestions:", rawQuestions); // Debugging line
  console.log("answers:", answers); // Debugging line

  let correctCount = 0;
  rawQuestions.forEach((question, index) => {
    const correctAnswerLine = question.find(line => line.startsWith("answer:"));
    const correctAnswerIndex = parseInt(correctAnswerLine.split(" ")[1]) - 1;
    console.log(`Question ${index + 1}: correct answer index is ${correctAnswerIndex}`); // Debugging line
    if (answers[index] === correctAnswerIndex) {
      correctCount++;
    }
  });

  const score = ((correctCount / rawQuestions.length) * 100).toFixed(2);

  return (
    <div className="result-container">
      <h1>Quiz Result</h1>
      <h2>Username: {username}</h2>
      <p>Category: {category}</p>
      <p>Difficulty: {difficulty}</p>
      <p>
        Score: {correctCount} out of {rawQuestions.length} ({score}%)
      </p>
      <p>You can go back to the home <Link to="/">here</Link>.</p>
    </div>
  );
};

export default QuizResult;
