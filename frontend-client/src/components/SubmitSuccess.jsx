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
          border: "1px solid #6610f2",
          backgroundColor: "#ffffff",
          padding: "20px 100px",
          textAlign: "center",
          borderRadius: "5px",
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
