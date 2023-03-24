import React, { useState } from 'react';
import NewLowestService from '../services/NewLowestService';
import { Typography, ButtonGroup, Button } from '@mui/material';
import '../styles.css';

function NewLowest() {
  const [shoeData, setShoeData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleButtonClick = async (method) => {
    try {
      const data = await NewLowestService[method]();
      setShoeData(data);
      setErrorMessage(null);
    } catch (error) {
      console.error(error);
      setShoeData(null);
      setErrorMessage('An error occurred while fetching shoe data.');
    }
  };

  return (
    <div className="new-lowest-container">
      <div className="button-group" style={{ marginTop: -300 }}>
        <ButtonGroup variant="contained">
          <Button style={{ backgroundColor: '#555' }} onClick={() => handleButtonClick('getNewLowestShoe')}>
            Overall
          </Button>
          <Button style={{ backgroundColor: '#555' }} onClick={() => handleButtonClick('getAdidasNewLowest')}>
            Adidas
          </Button>
          <Button style={{ backgroundColor: '#555' }} onClick={() => handleButtonClick('getNikeNewLowest')}>
            Nike
          </Button>
          <Button style={{ backgroundColor: '#555' }} onClick={() => handleButtonClick('getReebokNewLowest')}>
            Reebok
          </Button>
          <Button style={{ backgroundColor: '#555' }} onClick={() => handleButtonClick('getJordanNewLowest')}>
            Jordan
          </Button>
        </ButtonGroup>
      </div>
      {errorMessage ? (
        <Typography variant="body1" color="error">
          {errorMessage}
        </Typography>
      ) : null}
      {shoeData ? (
        <div className="new-lowest-card">
          <Typography variant="h4" gutterBottom>
            {shoeData.shoeName}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            {shoeData.shoePrice}
          </Typography>
          <Typography variant="h6" gutterBottom>
            {shoeData.dateAndTime}
          </Typography>
          <img src={shoeData.imageUrl} alt={shoeData.shoeName} />
        </div>
      ) : null}
    </div>
  );
}

export default NewLowest;
