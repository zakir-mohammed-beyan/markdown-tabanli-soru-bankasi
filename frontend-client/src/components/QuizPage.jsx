import React, { useState } from "react";
import { useParams } from "react-router-dom";
import MarkdownRenderer from "./MarkdownRenderer";
import './styles/QuizPage.css';

const QuizPage = ({ questions, handleSubmitQuiz }) => {
  const { category, difficulty } = useParams();
  const [answers, setAnswers] = useState({});

  const handleOptionChange = (questionIndex, optionIndex) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: optionIndex
    }));
  };

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

  return (
    <div className="centered-content">
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
