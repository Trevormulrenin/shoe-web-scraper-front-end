import axios from 'axios';

const CreateUserService = {
  async createUser(email, password) {
    try {
      const response = await axios.post(`http://localhost:8087/createUser/${email}/${password}`);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  },
};

export default CreateUserService;
