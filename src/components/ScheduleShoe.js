import React, { useState } from 'react';
import ScheduleShoeService from '../services/ScheduleShoeService';
import { useNavigate } from 'react-router-dom';

function ScheduleShoe() {
  const [shoeId, setShoeId] = useState('');
  const [threshold, setThreshold] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('user') !== null);
  const navigate = useNavigate();

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

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    navigate('../login');
  };

  return (
    <div>
      {isLoggedIn ? (
        <>
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
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <p>Please log in to access this page.</p>
      )}
    </div>
  );
}

export default ScheduleShoe;