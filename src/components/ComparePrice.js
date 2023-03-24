import React, { useState } from 'react';
import ComparePriceService from '../services/ComparePriceService';

function ComparePriceComponent() {
  const [shoeId, setShoeId] = useState('');
  const [comparePrice, setComparePrice] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await ComparePriceService.getComparePrice(shoeId);
    setComparePrice(data);
  };

  return (
    <div style={{ paddingTop: '100px'}}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="shoeId">Enter Shoe ID:</label>
        <input
          type="text"
          id="shoeId"
          value={shoeId}
          onChange={(e) => setShoeId(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      {comparePrice && (
        <table style={{ marginTop: "20px" }}>
          <thead>
            <tr>
              <th>Shoe Name</th>
              <th>Price Difference</th>
              <th>No. of Days Between</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{comparePrice.shoeName}</td>
              <td>{comparePrice.priceDifference}</td>
              <td>{comparePrice.noOfDaysBetween}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ComparePriceComponent;
