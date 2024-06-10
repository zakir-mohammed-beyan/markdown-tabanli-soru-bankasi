import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MarkdownRenderer from "./MarkdownRenderer";
import './styles/QuizPage.css';

const QuizPage = ({ questions, handleSubmitQuiz }) => {
  const { category, difficulty } = useParams();
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds

  // Handle option change
  const handleOptionChange = (questionIndex, optionIndex) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: optionIndex
    }));
  };

  // Format time for display
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // useEffect to handle timer countdown and auto-submit
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft <= 1) {
          clearInterval(timer);
          handleSubmitQuiz(null, answers); 
          return 0;
        }
        return prevTimeLeft - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [answers, handleSubmitQuiz]);

  // Extract questions from props based on category and difficulty
  let questionList = [];
  if (questions[category] && questions[category][difficulty]) {
    const rawQuestions = questions[category][difficulty];
    questionList = rawQuestions
      .trim()
      .split("\n####")
      .filter((q) => q)
      .map((q) => q.trim().split("\n"));
  } else {
    return <div>No questions available for this category and difficulty.</div>;
  }

  // Render the quiz page
  return (
    <div className="centered-content">
      <div className="timer">Time Left: {formatTime(timeLeft)}</div>
      <form onSubmit={(e) => handleSubmitQuiz(e, answers)}>
        {questionList.map((question, questionIndex) => {
          const imageLines = question.slice(1).filter((line) => line.startsWith('!['));
          const optionLines = question.slice(1).filter((line) => !line.startsWith('!['));

          return (
            <div key={questionIndex} className="question-block">
              <h4>{question[0].replace("####", "")}</h4>
              {imageLines.map((image, index) => (
                <div key={index} className="image-block">
                  <MarkdownRenderer markdown={image} />
                </div>
              ))}
              {optionLines.map((option, optionIndex) => (
                <div key={optionIndex} className="option-block">
                  <input
                    type="radio"
                    id={`q${questionIndex}_o${optionIndex}`}
                    name={`question${questionIndex}`}
                    value={optionIndex}
                    checked={answers[questionIndex] === optionIndex}
                    onChange={() => handleOptionChange(questionIndex, optionIndex)}
                  />
                  <label htmlFor={`q${questionIndex}_o${optionIndex}`}>
                    {option.replace(/^\d\.\s*\[\s*\]/, "")}
                  </label>
                </div>
              ))}
            </div>
          );
        })}
        <button type="submit" className="submit-button">
          Submit Quiz
        </button>
      </form>
    </div>
  );
};

export default QuizPage;