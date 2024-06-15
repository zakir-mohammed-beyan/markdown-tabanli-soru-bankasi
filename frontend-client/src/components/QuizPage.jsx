import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MarkdownRenderer from "./MarkdownRenderer";
import './styles/QuizPage.css';

const QuizPage = ({ questions, username }) => {
  const { category, difficulty } = useParams();
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(300); 
  const [showNotification, setShowNotification] = useState(false);
  const [startTime] = useState(Date.now());

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
      alert("sınavı gönderebilmek için en az 2 soruyu yanıtlamanız gerekmektedir.");
      return;
    }

    const confirmed = window.confirm("Sınav göndermek istediğinizden emin misiniz?");
    if (confirmed) {
      const endTime = Date.now();
      const timeTaken = Math.floor((endTime - startTime) / 1000); 
      console.log("Submitted answers:", answers);
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
        navigate("/quiz-result", {
          state: { answers, category, difficulty, username, timeTaken }
        });
      }, 3000); 
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft <= 1) {
          clearInterval(timer);
          handleSubmitQuiz(new Event('submit')); 
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
    return <div>Bu kategori ve zorluk derecesine uygun soru yok.</div>;
  }

  return (
    <div className="centered-content">
      {showNotification && (
        <div className="notification"> <h4 id="successfully">Başarıyla gönderildi</h4> Sınav tamamladınız. İşte sonuçlarınız:</div>
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
        Sınav gönderin
        </button>
      </form>
    </div>
  );
};

export default QuizPage;
