import axios from "axios";

class SavedShoeService {
  getAllSavedShoes(email) {
    return axios.get(`http://localhost:8087/getAllSavedShoes/${email}`);
  }

  getSavedShoe(shoeId, email) {
    return axios.get(`http://localhost:8087/getSavedShoe/${shoeId}/${email}`);
  }

  saveShoe(shoeName, email) {
    return axios.post(`http://localhost:8087/saveShoe/${shoeName}/${email}`)
  }

  updateSavedShoePrice(shoeId, email) {
    return axios.put(`http://localhost:8087/updatePrice/${shoeId}/${email}`)
  }
}

const savedShoeService = new SavedShoeService();
export default savedShoeService;