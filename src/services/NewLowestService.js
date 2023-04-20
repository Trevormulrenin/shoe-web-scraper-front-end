class NewLowestService {
    async getNewLowestShoe() {
        const response = await fetch('http://localhost:8087/newLowest/overall', {
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
        const response = await fetch('http://localhost:8087/newLowest/adidas', {
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
        const response = await fetch('http://localhost:8087/newLowest/nike', {
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
        const response = await fetch('http://localhost:8087/newLowest/reebok', {
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
        const response = await fetch('http://localhost:8087/newLowest/retro-jordans', {
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