import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./styles/CategorySelection.css";

const CategorySelection = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Add a specific class to the body when this component mounts
    document.body.classList.add('category-selection-body');

    // Remove the class when this component unmounts
    return () => {
      document.body.classList.remove('category-selection-body');
    };
  }, []);

  const handleCategoryClick = (category) => {
    navigate(`/quiz/${category}`);
  };

  return (
    <div className="category-selection-container">
      <h1 className="category-selection-title">Select a Category</h1>
      <div className="category-selection-list">
        <button onClick={() => handleCategoryClick('markup')} className="category-selection-item">Markup Languages</button>
        <button onClick={() => handleCategoryClick('programming')} className="category-selection-item">Programming Languages</button>
        <button onClick={() => handleCategoryClick('general')} className="category-selection-item">General Info about Turkey</button>
      </div>
    </div>
  );
};

export default CategorySelection;
