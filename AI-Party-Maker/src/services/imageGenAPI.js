const API_KEY = process.env.REACT_APP_HUGGING_FACE_API_KEY;
const API_URL = 'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2-1';

async function generateImage(prompt, retries = 10, delay = 5000) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ inputs: prompt }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('API Error Response:', error);

      // Handle "model loading" error
      if (error.error && error.error.includes('currently loading') && retries > 0) {
        console.log(`Model is loading. Retrying in ${delay / 1000} seconds...`);
        await new Promise(resolve => setTimeout(resolve, delay)); // Wait before retrying
        return generateImage(prompt, retries - 1, delay); // Retry with decremented retries
      }

      throw new Error(`API Error: ${error.error}`);
    }

    // Parse the successful response
    const blob = await response.blob();
    const imageUrl = URL.createObjectURL(blob);
    console.log('Generated Image URL:', imageUrl); // Debugging log
    return imageUrl;
  } catch (error) {
    console.error('Error generating image:', error);
    return null; // Return null on failure
  }
}

export default generateImage;
