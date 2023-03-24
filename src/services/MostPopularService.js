import axios from 'axios';

const API_URL = 'http://localhost:8087';

class MostPopularService {
  getMostPopular() {
    return axios.get(`${API_URL}/mostPopular`);
  }
}
const mostPopularService = new MostPopularService();
export default mostPopularService;
