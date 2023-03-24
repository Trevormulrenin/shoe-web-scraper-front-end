import { useState } from 'react';
import ScheduleShoeService from '../services/ScheduleShoeService';

function ScheduleShoe() {
  const [shoeId, setShoeId] = useState('');
  const [threshold, setThreshold] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await ScheduleShoeService.scheduleShoe(shoeId, threshold);
      alert('Shoe scheduled successfully!');
      setShoeId('');
      setThreshold('');
    } catch (error) {
      alert('Error scheduling shoe');
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Schedule Shoe</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Shoe ID:
          <input
            type="text"
            value={shoeId}
            onChange={(e) => setShoeId(e.target.value)}
          />
        </label>
        <label>
          Threshold ($):
          <input
            type="text"
            value={threshold}
            onChange={(e) => setThreshold(e.target.value)}
          />
        </label>
        <button type="submit">Schedule</button>
      </form>
    </div>
  );
}

export default ScheduleShoe;
