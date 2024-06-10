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
          <h1 className="selection-title">Select Difficulty</h1>
          <div className="selection-list">
            <button onClick={() => handleDifficultyClick('beginner')} className="selection-item">Beginner</button>
            <button onClick={() => handleDifficultyClick('intermediate')} className="selection-item">Intermediate</button>
            <button onClick={() => handleDifficultyClick('advanced')} className="selection-item">Advanced</button>
          </div>
          <button onClick={handlePreviousClick} className="btn-previous">Previous</button>
        </>
      ) : (
        <>
          <h1 className="selection-title">Select a Category</h1>
          <div className="selection-list">
            <button onClick={() => handleCategoryClick('markup')} className="selection-item">Markup Languages</button>
            <button onClick={() => handleCategoryClick('programming')} className="selection-item">Programming Languages</button>
            <button onClick={() => handleCategoryClick('general')} className="selection-item">General Info about Turkey</button>
          </div>
        </>
      )}
    </div>
  );
};

export default CategorySelection;