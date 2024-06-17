import React from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import "./styles/QuizResult.css";

const QuizResult = ({ onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { answers, category, difficulty, username, timeTaken } = location.state || {};


  if (!answers || !category || !difficulty || !username) {
    return <div>Görüntülenecek sınav sonucu yok.</div>;
  }


  const questions = require("./Questions").questions;

 
  if (!questions[category] || !questions[category][difficulty]) {
    return <div>Geçersiz kategori veya zorluk.</div>;
  }

  const rawQuestionsText = questions[category][difficulty];
  

  if (!rawQuestionsText) {
    return <div>Seçilen kategori ve zorluk derecesine ilişkin soru mevcut değil.</div>;
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
      console.error(`Soruya cevap bulunamadı ${index + 1}`);
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
      <h1>Sınav Sonucu</h1>
      <h2>Kullanıcı adı: {username}</h2>
<<<<<<< HEAD
      <p>Kategori: {category}</p>
      <p>Zorluk seviye: {difficulty}</p>
      <p>Sayfa'da geçen süre: {formatTime(timeTaken)}</p>
      <p>
      Alınan puan: {rawQuestions.length} üzerinden {correctCount} ({score}%)
      </p>
     
=======
      <p>kategori: {category}</p>
      <p>zorluk seviye: {difficulty}</p>
      <p>
      Puan: {rawQuestions.length} üzerinden {correctCount} ({score}%)
      </p>
      <p>Geçen süre: {formatTime(timeTaken)}</p>
>>>>>>> 2d1b1b27b8b8e6554fc1d0ab76030a7433b8c829
      {correctCount === rawQuestions.length && (
        <p className="congratulations-message">Tebrikler! Mükemmel bir puan aldınız!</p>
      )}
      <p>Tekrar denemek ister misiniz ? <Link to="/category-selection">burda</Link>.</p> 
      <button className="logout-button" onClick={handleLogout}>Çıkış yapın</button>
    </div>
  );
};

export default QuizResult;
