import React, { useState } from "react";
import PromptForm from "./components/PromptForm";
import AudioPlayer from "./components/AudioPlayer";
import ThreeDScene from "./components/ThreeDScene";
import { generateSpeech } from "./services/elevenLabsAPI";
import generateImage from "./services/imageGenAPI";

const App = () => {
  const [audioUrl, setAudioUrl] = useState(""); // Store the generated audio URL
  const [imageUrl, setImageUrl] = useState(""); // Store the generated image URL
  const [error, setError] = useState(""); // Handle errors
  const [loading, setLoading] = useState(false); // Manage loading state

  const handlePromptSubmit = async (prompt) => {
    try {
      setError("");
      setLoading(true); // Set loading to true

      // Generate Text-to-Speech (TTS)
      const audio = await generateSpeech(prompt);
      setAudioUrl(audio);

      // Automatically play the audio
      const audioPlayer = new Audio(audio);
      audioPlayer.play();

      // Generate Image
      const imageUrl = await generateImage(prompt);
      if (imageUrl) {
        setImageUrl(imageUrl); // Set the generated image URL
      } else {
        setError("Image generation failed. Please try again.");
      }
    } catch (err) {
      console.error(err.message);
      setError("Failed to process your request. Please try again.");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div>
      <h1>Welcome to AI-Party!</h1>
      <PromptForm onPromptSubmit={handlePromptSubmit} />
      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading && <p>Loading... Please wait, the model might take some time to load.</p>}
      <AudioPlayer audioUrl={audioUrl} />
      {imageUrl && <ThreeDScene imageUrl={imageUrl} />}
    </div>
  );
};

export default App;
