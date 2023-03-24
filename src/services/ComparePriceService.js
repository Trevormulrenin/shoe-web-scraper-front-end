import axios from 'axios';

class ComparePriceService {
    
    async getComparePrice(shoeId, email) {

    const response = await axios.post(`http://localhost:8087/comparePrice/${shoeId}/${email}`, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const data = response.data;
        console.log(data); // log the response to the console
        return data;
    }
}

const comparePriceService = new ComparePriceService();
export default comparePriceService;
