import axios from 'axios';

class SearchService {
  async searchByShoeName(shoeName) {
    try {
      const response = await axios.get(`http://localhost:8087/searchByShoe/${shoeName}`);
      console.log(response.data); // log the response to the console
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to search for shoe by name');
    }
  }
}

const searchService = new SearchService();
export default searchService;
