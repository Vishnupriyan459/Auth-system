import axios from 'axios';

export const login = async (username, password) => {
  try {
    const res = await axios.post(
      'https://dummyjson.com/auth/login',
      { username, password },
      
    );

    return res.data;
  } catch (error) {
    
    if (axios.isAxiosError(error)) {
      if (error.response) {
       
        throw error.response.data;
      } else if (error.request) {
       
        throw { message: 'No response from server' };
      }
    }

    // Unknown error
    throw { message: 'Something went wrong' };
  }
};
