import React, { useState, useEffect } from 'react';
import MostPopularService from '../services/MostPopularService';
import '../MostPopular.css'; // import CSS file for styling

const MostPopular = () => {
  const [shoes, setShoes] = useState([]);

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
  }, []);

  return (
    <div className="shoe-grid">
      {shoes.map((shoe) => (
        <div className="shoe-card" key={shoe.name}>
          <img src={shoe.imageUrl} alt={shoe.name} />
          <p className="shoe-name">{shoe.name}</p>
          <p className="shoe-price">{shoe.price}</p>
          <p className="shoe-date">{shoe.dateAndtime}</p>
        </div>
      ))}
    </div>
  );
};

export default MostPopular;
