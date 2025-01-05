import axios from 'axios';

const VOICE_ID = "cgSgspJ2msm6clMCkdW9"; // Aria's voice ID
const API_KEY = process.env.REACT_APP_ELEVEN_LABS_API_KEY;
export const generateSpeech = async (text) => {
  try {
    const response = await axios.post(
      `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
      {
        text,
        voice_settings: {
          stability: 0.75,
          similarity_boost: 0.75,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          "xi-api-key": API_KEY,
        },
        responseType: "blob", // Receive audio data as binary
      }
    );

    // Create an audio URL from the binary response
    return URL.createObjectURL(response.data);
  } catch (error) {
    console.error("Error generating speech:", error.response || error.message);
    throw new Error("Failed to generate speech. Please try again.");
  }
};
