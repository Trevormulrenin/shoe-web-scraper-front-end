import React, { useState, useEffect } from 'react';
import MostPopularService from '../services/MostPopularService';
import SavedShoeService from '../services/SavedShoeService';
import '../MostPopular.css';

const MostPopular = () => {
  const [shoes, setShoes] = useState([]);
  const [user, setUser] = useState(null);
  const [savedShoes, setSavedShoes] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchMostPopular = async () => {
      try {
        const response = await MostPopularService.getMostPopular();
        setShoes(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMostPopular();

    // Check if user is logged in
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  const handleSaveShoe = (shoeName) => (event) => {
    event.preventDefault();
    // Check if user is logged in
    if (!user) {
      setError('Please login to save shoes');
      return;
    }
    SavedShoeService.saveShoe(shoeName, user.email)
      .then((response) => {
        const newSavedShoe = response.data;
        setSavedShoes([...savedShoes, newSavedShoe]);
        setSuccess(`***${shoeName}*** saved successfully!`);
      })
      .catch((error) => {
        setError(error);
      });
  };

  return (
    <div>
      <div className="shoe-grid">
        {shoes.map((shoe) => (
          <div className="shoe-card" key={shoe.name}>
            <img src={shoe.imageUrl} alt={shoe.name} />
            <p className="shoe-name">{shoe.name}</p>
            <p className="shoe-price">{shoe.price}</p>
            <p className="shoe-date">{shoe.dateAndtime}</p>
            <button className="save-button" onClick={handleSaveShoe(shoe.name)}>Save Shoe</button>
            {error && <p className="error">{error}</p>}
          </div>
        ))}
      </div>
      {success && <p className="success">{success}</p>}
    </div>
  );
};

export default MostPopular;
