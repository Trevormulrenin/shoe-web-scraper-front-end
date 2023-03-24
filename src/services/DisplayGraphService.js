import axios from "axios";

const PRICE_HISTORY_API_BASE_URL = "http://localhost:8087/priceHistory";

class DisplayGraphService {
  getPriceHistory(shoeId, email) {
    return axios.get(`${PRICE_HISTORY_API_BASE_URL}/${shoeId}/${email}`);
  }
}
const displayGraphService = new DisplayGraphService();
export default displayGraphService;
