import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
import "./App.css";
import MarkdownRenderer from "./components/MarkdownRenderer";
import Login from "./components/Login";
import SubmitSuccess from "./components/SubmitSuccess";
import CategorySelection from "./components/CategorySelection";

const App = () => {
  const markupQuestions = `

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

#### 3. This image is related to which markup language?

![Markdown Logo](/markdown_icon.png)
- [ ] HTML
- [ ] XML
- [ ] Markdown
- [ ] JSON
- [ ] YAML

#### 4. How do you create a checkbox in Markdown?

- [ ] [ ] Checkbox
- [ ] - [ ] Checkbox
- [ ] * [ ] Checkbox
- [ ] - [x] Checkbox
- [ ] [x] Checkbox

#### 5. Which symbol is used for creating a heading in Markdown?

- [ ] *
- [ ] #
- [ ] @
- [ ] $
- [ ] &

#### 6. Which HTML tag is used to create a hyperlink?

- [ ] <link>
- [ ] <a>
- [ ] <href>
- [ ] <hyperlink>
- [ ] <anchor>

#### 7. What is the purpose of the <em> tag in HTML?

- [ ] To emphasize text
- [ ] To create a table
- [ ] To embed an image
- [ ] To create a link
- [ ] To add a line break

#### 8. Which attribute is used to provide an alternate text for an image in HTML?

- [ ] alt
- [ ] src
- [ ] href
- [ ] title
- [ ] link

#### 9. What does XML stand for?

- [ ] Extra Markup Language
- [ ] Example Markup Language
- [ ] Extensible Markup Language
- [ ] Extension Markup Language
- [ ] Exchange Markup Language

#### 10. Which HTML element is used for the largest heading?

- [ ] <h6>
- [ ] <h4>
- [ ] <h1>
- [ ] <header>
- [ ] <head>
`;

  const programmingQuestions = `
#### 1. Which programming language is known for its use in web development and is often embedded in HTML?

- [ ] Python
- [ ] Java
- [ ] JavaScript
- [ ] C
- [ ] PHP

#### 1. Which programming language is known for its simplicity and readability, often recommended for beginners?

- [ ] C
- [ ] Java
- [ ] PHP
- [ ] Python
- [ ] JavaScript

#### 3. Which language is commonly used for system programming and operating systems?

- [ ] Python
- [ ] Java
- [ ] C
- [ ] JavaScript
- [ ] PHP

#### 4. Which programming language is widely used for building enterprise-scale applications?

- [ ] Python
- [ ] Java
- [ ] C
- [ ] JavaScript
- [ ] PHP

#### 5. Which language is known for its extensive use in server-side scripting and web development?

- [ ] Python
- [ ] Java
- [ ] C
- [ ] JavaScript
- [ ] PHP

#### 6. What does "DOM" stand for in JavaScript?

- [ ] Document Object Model
- [ ] Data Object Model
- [ ] Digital Object Management
- [ ] Document Operational Mode
- [ ] Data Operational Mode

#### 7. Which keyword is used to declare a constant in JavaScript?

- [ ] var
- [ ] let
- [ ] const
- [ ] static
- [ ] immutable

#### 8. Which company developed the Java programming language?

- [ ] Microsoft
- [ ] Apple
- [ ] Sun Microsystems
- [ ] IBM
- [ ] Oracle

#### 9. Which PHP function is used to include the content of one PHP file into another PHP file?

- [ ] include()
- [ ] import()
- [ ] require()
- [ ] insert()
- [ ] add()

#### 10. What is the output of the following Python code?

#### print("Hello, World!".upper())


- [ ] hello, world!
- [ ] Hello, World!
- [ ] HELLO, WORLD!
- [ ] Hello, world!
- [ ] hELLO, wORLD!

`;

  const generalInfoQuestions = `
#### 1. Which historical landmark in Turkey was once a church, then a mosque, and is now a museum?

- [ ] Blue Mosque
- [ ] Topkapi Palace
- [ ] Hagia Sophia
- [ ] Galata Tower
- [ ] Bosphorus Bridge

#### 2. Which sea borders Turkey to the north?

- [ ] Mediterranean Sea
- [ ] Aegean Sea
- [ ] Black Sea
- [ ] Sea of Marmara
- [ ] Red Sea

#### 3. Which city is located at the intersection of the Black Sea and the Sea of Marmara?

![Map of Turkey](/maps-of-turkey-regions.webp)
- [ ] Istanbul
- [ ] Ankara
- [ ] Izmir
- [ ] Antalya
- [ ] Bursa

#### 4. Which mountain is the highest peak in Turkey?

- [ ] Mount Ararat
- [ ] Mount Erciyes
- [ ] Mount Suphan
- [ ] Mount Nemrut
- [ ] Mount Kackar

#### 5. Which famous ancient city located in Turkey is known for its association with the Trojan War?

- [ ] Ephesus
- [ ] Troy
- [ ] Pergamon
- [ ] Aspendos
- [ ] Patara

#### 6. What is the capital city of Turkey?

- [ ] Istanbul
- [ ] Ankara
- [ ] Izmir
- [ ] Antalya
- [ ] Bursa

#### 7. What is the largest city in Turkey by population?

- [ ] Ankara
- [ ] Izmir
- [ ] Istanbul
- [ ] Bursa
- [ ] Antalya

#### 8. Which Turkish leader founded the Republic of Turkey in 1923?

- [ ] Mustafa Kemal Atatürk
- [ ] Suleiman the Magnificent
- [ ] Mehmed the Conqueror
- [ ] Recep Tayyip Erdoğan
- [ ] Ismet Inönü

#### 9. What is the official language of Turkey?

- [ ] Arabic
- [ ] Greek
- [ ] Turkish
- [ ] Kurdish
- [ ] Armenian

#### 10. Which body of water separates the European and Asian parts of Turkey?

- [ ] Bosphorus Strait
- [ ] Dardanelles Strait
- [ ] Aegean Sea
- [ ] Black Sea
- [ ] Sea of Marmara
`;

  const [selectedOptions, setSelectedOptions] = useState(Array(30).fill(null));
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleCheckboxClick = (questionIndex, optionIndex) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[questionIndex] = optionIndex;
    setSelectedOptions(newSelectedOptions);
  };

  const handleLogin = (username) => {
    setIsLoggedIn(true);
  };

  const handleSubmitQuiz = () => {
    const answeredCount = selectedOptions.filter(
      (option) => option !== null
    ).length;

    if (answeredCount < 3) {
      alert("You must answer at least 3 questions to submit the quiz.");
    } else {
      const confirmed = window.confirm(
        "Are you sure you want to submit the quiz?"
      );
      if (confirmed) {
        window.location.href = "/submit-success";
      }
    }
  };

  const QuizPage = () => {
    const { category } = useParams();

    let markdownContent;
    switch (category) {
      case "markup":
        markdownContent = markupQuestions;
        break;
      case "programming":
        markdownContent = programmingQuestions;
        break;
      case "general":
        markdownContent = generalInfoQuestions;
        break;
      default:
        markdownContent = "";
    }

    return (
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
    );
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
                  <CategorySelection />
                </div>
              )
            }
          />
          <Route path="/quiz/:category" element={<QuizPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
