import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MarkdownRenderer from "./MarkdownRenderer";
import CustomAlert from "../components/CustomAlert";
import CustomConfirm from "../components/CustomConfirm";
import "./styles/QuizPage.css";

const QuizPage = ({ questions, username }) => {
  const { category, difficulty } = useParams();
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(300);
  const [showAlert, setShowAlert] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [startTime] = useState(Date.now());

  const handleOptionChange = (questionIndex, optionIndex) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: optionIndex,
    }));
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleSubmitQuiz = (event) => {
    event.preventDefault();
    const answeredCount = Object.keys(answers).length;

    if (answeredCount < 2) {
      setShowAlert(true);
      return;
    }

    setShowConfirm(true);
  };

  const handleConfirm = () => {
    setShowConfirm(false);
    const endTime = Date.now();
    const timeTaken = Math.floor((endTime - startTime) / 1000);
    console.log("Submitted answers:", answers);
    navigate("/quiz-result", {
      state: { answers, category, difficulty, username, timeTaken },
    });
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft <= 1) {
          clearInterval(timer);
          handleSubmitQuiz(new Event("submit"));
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
      .map((q) =>
        q
          .trim()
          .split("\n")
          .filter((line) => !line.startsWith("answer:"))
      );
  } else {
    return <div>Bu kategori ve zorluk derecesine uygun soru yok.</div>;
  }

  return (
    <div className="centered-content">
      {showAlert && (
        <CustomAlert
          message="Sınavı gönderebilmek için en az 2 soruyu yanıtlamanız gerekmektedir."
          onClose={() => setShowAlert(false)}
        />
      )}
      {showConfirm && (
        <CustomConfirm
          message="Sınav göndermek istediğinizden emin misiniz?"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
      <div className="timer">Kalan süre: {formatTime(timeLeft)}</div>
      <form onSubmit={handleSubmitQuiz}>
        {questionList.map((question, questionIndex) => {
          const imageLines = question
            .slice(1)
            .filter((line) => line.startsWith("!["));
          const optionLines = question
            .slice(1)
            .filter((line) => !line.startsWith("!["));

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
                    onChange={() =>
                      handleOptionChange(questionIndex, optionIndex)
                    }
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
          Sınav gönderin
        </button>
      </form>
    </div>
  );
};

export default QuizPage;
