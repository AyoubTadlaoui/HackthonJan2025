import axios from 'axios';

const VOICE_ID = "pFZP5JQG7iQjIQuC4Bku"; // Aria's voice ID
const API_KEY = "sk_ba8bcaa4e22236af1178c14e0fd9752eb89d45ef6a939c9c";

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
