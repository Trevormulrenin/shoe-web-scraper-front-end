import axios from 'axios';

const login = async (email, password) => {
  try {
    const response = await axios.post('http://localhost:8087/login', { email, password });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Login failed');
  }
};

const loginService = { login };

export default loginService;