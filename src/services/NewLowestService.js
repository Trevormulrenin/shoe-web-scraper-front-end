import axios from 'axios';

class NewLowestService {
  async getNewLowestShoe() {
    const response = await axios.get('http://localhost:8087/newLowest/overall');
    console.log(response.data);
    return response.data;
  }

  async getAdidasNewLowest() {
    const response = await axios.get('http://localhost:8087/newLowest/adidas');
    console.log(response.data);
    return response.data;
  }

  async getNikeNewLowest() {
    const response = await axios.get('http://localhost:8087/newLowest/nike');
    console.log(response.data);
    return response.data;
  }

  async getReebokNewLowest() {
    const response = await axios.get('http://localhost:8087/newLowest/reebok');
    console.log(response.data);
    return response.data;
  }

  async getJordanNewLowest() {
    const response = await axios.get('http://localhost:8087/newLowest/retro-jordans');
    console.log(response.data);
    return response.data;
  }
}

const newLowestService = new NewLowestService();
export default newLowestService;
