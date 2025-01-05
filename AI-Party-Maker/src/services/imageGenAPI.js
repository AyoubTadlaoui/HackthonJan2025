import axios from 'axios';

export const generateImage = async (prompt) => {
  try {
    const response = await axios.post(
      'https://api.stable-diffusion-service.com/generate',
      { prompt },
      { headers: { Authorization: 'Bearer <YOUR_API_TOKEN>' } }
    );
    return response.data.image_url;
  } catch (error) {
    console.error('Error generating image:', error.response || error.message);
    throw new Error('Failed to generate image.');
  }
};
