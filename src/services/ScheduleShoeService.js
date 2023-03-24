import axios from 'axios';

const ScheduleShoeService = {

    scheduleShoe(shoeId, threshold) {
        return axios.post(`http://localhost:8087/schedule-shoe/${shoeId}/${threshold}`);
    }
};




export default ScheduleShoeService;