class NewLowestService {

    async getNewLowestShoe() {
        const response = await fetch('http://localhost:8087/newLowest', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log(data); // log the response to the console
        return data;
    }

    async getAdidasNewLowest() {
        const response = await fetch('http://localhost:8087/adidasNewLowest', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log(data); // log the response to the console
        return data;
    }
    
    async getNikeNewLowest() {
        const response = await fetch('http://localhost:8087/nikeNewLowest', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log(data); // log the response to the console
        return data;
    }
    
    async getReebokNewLowest() {
        const response = await fetch('http://localhost:8087/reebokNewLowest', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log(data); // log the response to the console
        return data;
    }
    
    async getJordanNewLowest() {
        const response = await fetch('http://localhost:8087/jordanNewLowest', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log(data); // log the response to the console
        return data;
    }
}

const newLowestService = new NewLowestService();
export default newLowestService;