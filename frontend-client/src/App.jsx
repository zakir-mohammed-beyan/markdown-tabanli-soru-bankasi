import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import MarkdownRenderer from "./components/MarkdownRenderer";
import Login from "./components/Login";
import SubmitSuccess from "./components/SubmitSuccess";

const App = () => {
  const markdownContent = `
# Markdown-based Multiple Choice Question Bank

#### 1. What does HTML stand for?

- [ ] Hyper Trainer Marking Language
- [ ] Hyper Text Marketing Language
- [ ] Hyper Text Markup Language
- [ ] Hyper Text Markup Leveler
- [ ] Hyper Text Marking Level



#### 2. Which file extension is used for Markdown files?

- [ ] .py
- [ ] .rb
- [ ] .md
- [ ] .html
- [ ] .css

#### 3. What is CSS?

- [ ] Computer Style Sheets
- [ ] Colorful Style Sheets
- [ ] Creative Style Sheets
- [ ] Cascading Style Sheets
- [ ] Complex Style Sheets

#### 4. This image is related to which markup language?

![Markdown Logo](/markdown_icon.png)
- [ ] HTML
- [ ] XML
- [ ] Markdown
- [ ] JSON



#### 5. What is React?

- [ ] Library
- [ ] Framework
- [ ] Language
- [ ] Database
- [ ] API

#### 6. How do you create a checkbox in Markdown?

- [ ] [ ] Checkbox
- [ ] - [ ] Checkbox
- [ ] * [ ] Checkbox
- [ ] - [x] Checkbox
- [ ] [x] Checkbox


#### 7. Which symbol is used for creating a heading in Markdown?

- [ ] *
- [ ] #
- [ ] @
- [ ] $
#### 8. Which city is located at the intersection of the Black Sea and the Sea of Marmara?

![Map of Turkey](/maps-of-turkey-regions.webp)
- [ ] Istanbul
- [ ] Ankara
- [ ] Izmir
- [ ] Antalya
- [ ] Bursa

#### 9. How do you create a hyperlink in Markdown?

- [ ] \`[link](URL)\`
- [ ] \`<a href="URL">link</a>\`
- [ ] \`[URL](link)\`
- [ ] \`<link URL>\`

#### 10. Which character is used to create an unordered list in Markdown?

- [ ] *
- [ ] 1.
- [ ] -
- [ ] #
`;

  const [selectedOptions, setSelectedOptions] = useState(Array(11).fill(null)); // Adjusted for 11 questions
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleCheckboxClick = (questionIndex, optionIndex) => {
    const newSelectedOptions = [...selectedOptions];
    if (newSelectedOptions[questionIndex] === optionIndex) {
      newSelectedOptions[questionIndex] = null;
    } else {
      newSelectedOptions[questionIndex] = optionIndex;
    }
    setSelectedOptions(newSelectedOptions);
  };

  const handleLogin = (username) => {
    setIsLoggedIn(true);
  };

  const handleSubmitQuiz = () => {
    window.location.href = "/submit-success";
  };

  return (
    <Router>
      <div className="main-container">
        <Routes>
          <Route path="/submit-success" element={<SubmitSuccess />} />
          <Route
            path="/"
            element={
              !isLoggedIn ? (
                <div className="centered-content">
                  <Login onLogin={handleLogin} />
                </div>
              ) : (
                <div className="centered-content">
                  <MarkdownRenderer
                    markdown={markdownContent}
                    handleCheckboxClick={handleCheckboxClick}
                    selectedOptions={selectedOptions}
                  />
                  <button className="submit-button" onClick={handleSubmitQuiz}>
                    Submit Quiz
                  </button>
                </div>
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
