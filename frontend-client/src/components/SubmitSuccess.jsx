import React from "react";
import MarkdownRenderer from "./MarkdownRenderer"; // Adjust the path if necessary

const SubmitSuccess = () => {
  const markdownContent = `
## Successfully submitted!

You can go back to the quiz [here](/).
`;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "50vh",
      }}
    >
      <div
        className="centered-content"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: 'center',
          boxShadow: "0px 0px 50px rgba(0, 0, 0, 0.1)", 
          backgroundColor: "#ffffff",
          padding: "20px 100px",
          textAlign: "center",
          borderRadius: "10px", 
          height: "150px"
          
        }}
      >
        <MarkdownRenderer
          markdown={markdownContent}
          style={{ textAlign: "center" }}
        />
      </div>
    </div>
  );
};

export default SubmitSuccess;
