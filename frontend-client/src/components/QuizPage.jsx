import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MarkdownRenderer from "./MarkdownRenderer";
import './styles/QuizPage.css';

const QuizPage = ({ questions, username }) => {
  const { category, difficulty } = useParams();
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [showNotification, setShowNotification] = useState(false);

  const handleOptionChange = (questionIndex, optionIndex) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: optionIndex
    }));
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleSubmitQuiz = (event) => {
    event.preventDefault();
    const answeredCount = Object.keys(answers).length;

    if (answeredCount < 2) {
      alert("You must answer at least 2 questions to submit the quiz.");
      return;
    }

    const confirmed = window.confirm("Are you sure you want to submit the quiz?");
    if (confirmed) {
      console.log("Submitted answers:", answers);
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
        navigate("/quiz-result", { state: { answers, category, difficulty, username } });
      }, 3000); // Show notification for 3 seconds
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft <= 1) {
          clearInterval(timer);
          handleSubmitQuiz(new Event('submit')); // Trigger submit when time runs out
          return 0;
        }
        return prevTimeLeft - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [answers]);

  let questionList = [];
  if (questions[category] && questions[category][difficulty]) {
    const rawQuestions = questions[category][difficulty];
    questionList = rawQuestions
      .trim()
      .split("\n####")
      .filter((q) => q)
      .map((q) => q.trim().split("\n").filter(line => !line.startsWith("answer:")));
  } else {
    return <div>No questions available for this category and difficulty.</div>;
  }

  return (
    <div className="centered-content">
      {showNotification && (
        <div className="notification">
          Successfully submitted, please check your result!
        </div>
      )}
      <div className="timer">Time Left: {formatTime(timeLeft)}</div>
      <form onSubmit={handleSubmitQuiz}>
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