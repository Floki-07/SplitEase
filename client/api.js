import axios from 'axios';

// Handle Google Auth
export const googleAuth = async (code) => {
  try {
    const response = await axios.post(
      'http://localhost:3000/auth/google/callback',
      { code },
      { withCredentials: true }
    );
    return response?.data;
  } catch (error) {
    console.error('API call error:', error);
    return { success: false };
  }
};
