import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const MarkdownRenderer = ({ markdown }) => {
  const components = {
    img: ({ node, ...props }) => {
      return <img {...props} style={{ maxWidth: "100%", height: "auto" }} />;
    }
  };

  return (
    <div className="markdown-content">
      <ReactMarkdown components={components} remarkPlugins={[remarkGfm]}>
        {markdown}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
