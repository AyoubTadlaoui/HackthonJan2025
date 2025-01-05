import React, { useState } from "react";
import PromptForm from "./components/PromptForm";
import AudioPlayer from "./components/AudioPlayer";
import { generateSpeech } from "./services/elevenLabsAPI";

const App = () => {
  const [audioUrl, setAudioUrl] = useState("");
  const [error, setError] = useState("");

  const handlePromptSubmit = async (prompt) => {
    try {
      setError("");
      const audio = await generateSpeech(prompt);
      setAudioUrl(audio);

      // Automatically play the audio
      const audioPlayer = new Audio(audio);
      audioPlayer.play();
    } catch (err) {
      console.error(err.message);
      setError("Failed to generate speech. Please try again.");
    }
  };

  return (
    <div>
      <h1>Welcome to SAMIA's Birthday Party!</h1>
      <PromptForm onPromptSubmit={handlePromptSubmit} />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <AudioPlayer audioUrl={audioUrl} />
    </div>
  );
};

export default App;
