import React from "react";
import { useParams } from "react-router-dom";
import MarkdownRenderer from "./MarkdownRenderer";

const QuizPage = ({
  questions,
  handleRadioClick,
  selectedOptions,
  handleSubmitQuiz,
}) => {
  const { category, difficulty } = useParams();

 
  let markdownContent;
  if (questions[category] && questions[category][difficulty]) {
    markdownContent = questions[category][difficulty];
  } else {
    markdownContent = "No questions available for this category and difficulty.";
  }

  return (
    <div className="centered-content">
      <MarkdownRenderer
        markdown={markdownContent}
        handleRadioClick={handleRadioClick}
        selectedOptions={selectedOptions}
      />
      <button className="submit-button" onClick={handleSubmitQuiz}>
        Submit Quiz
      </button>
    </div>
  );
};

export default QuizPage;
