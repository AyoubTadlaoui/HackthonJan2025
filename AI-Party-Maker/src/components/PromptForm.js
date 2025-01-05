import React, { useState } from "react";

const PromptForm = ({ onPromptSubmit }) => {
  const [prompt, setPrompt] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    onPromptSubmit(prompt);
    setPrompt(""); // Clear the input field
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Type your text here..."
      />
      <button type="submit">Generate Speech</button>
    </form>
  );
};

export default PromptForm;
