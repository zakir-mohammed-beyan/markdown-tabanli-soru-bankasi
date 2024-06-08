import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const MarkdownRenderer = ({
  markdown,
  handleCheckboxClick,
  selectedOptions,
}) => {
  const components = {
    li({ children, node }) {
      const firstChild = node.children[0];
      const isCheckbox =
        firstChild &&
        firstChild.type === "element" &&
        firstChild.tagName === "input";

      if (isCheckbox) {
        const questionIndex = Math.floor(node.position.start.line / 7);
        const optionIndex = (node.position.start.line % 7) - 2;

        return (
          <div key={`${questionIndex}-${optionIndex}`}>
            <label>
              <input
                type="checkbox"
                checked={selectedOptions[questionIndex] === optionIndex}
                onChange={() => handleCheckboxClick(questionIndex, optionIndex)}
              />
              {children.slice(1)}
            </label>
          </div>
        );
      }

      return <li>{children}</li>;
    },
    img({ node, ...props }) {
      return <img {...props} style={{ maxWidth: "100%", height: "auto" }} />;
    },
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