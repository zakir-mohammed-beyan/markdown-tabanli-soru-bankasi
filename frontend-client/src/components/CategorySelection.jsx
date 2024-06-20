import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./styles/CategorySelection.css";

const CategorySelection = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isChoosingDifficulty, setIsChoosingDifficulty] = useState(false);

  useEffect(() => {
    document.body.classList.add('category-selection-body');
    return () => {
      document.body.classList.remove('category-selection-body');
    };
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setIsChoosingDifficulty(true);
  };

  const handleDifficultyClick = (difficulty) => {
    navigate(`/quiz/${selectedCategory}/${difficulty}`);
  };

  const handlePreviousClick = () => {
    if (isChoosingDifficulty) {
      setIsChoosingDifficulty(false);
      setSelectedCategory(null); 
    }
  };

  return (
    <div className="selection-container">
      {isChoosingDifficulty ? (
        <>
          <h1 className="selection-title">Zorluk seviyesini seçin</h1>
          <div className="selection-list">
            <button onClick={() => handleDifficultyClick('baslangic')} className="selection-item">Başlangıç</button>
            <button onClick={() => handleDifficultyClick('orta')} className="selection-item">Orta seviye</button>
            <button onClick={() => handleDifficultyClick('yuksek')} className="selection-item">Yüksek seviye</button>
          </div>
          <button onClick={handlePreviousClick} className="btn-previous">Öncesi</button>
        </>
      ) : (
        <>
          <h1 className="selection-title">Bir kategori seçin</h1>
          <div className="selection-list">
            <button onClick={() => handleCategoryClick('isaretleme')} className="selection-item">İşaretleme Dilleri</button>
            <button onClick={() => handleCategoryClick('programlama')} className="selection-item">Programlama dilleri</button>
            <button onClick={() => handleCategoryClick('genel')} className="selection-item">Türkiye Hakkında Genel Bilgi</button>
          </div>
        </>
      )}
    </div>
  );
};

export default CategorySelection;
