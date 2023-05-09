import React, { useState, useEffect } from "react";
import SavedShoeService from "../services/SavedShoeService";
import "../styles.css";
import { useNavigate } from 'react-router-dom';

function SavedShoeComponent() {
  const [savedShoes, setSavedShoes] = useState([]);
  const [shoeId, setShoeId] = useState("");
  const [updateShoeId, setUpdateShoeId] = useState("");
  const [selectedShoe, setSelectedShoe] = useState(null);
  const [user, setUser] = useState(null);
  const [savedShoeName, setSavedShoeName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUser(user);
    } else {
      navigate('../login');
    }
  }, [navigate]);

  useEffect(() => {
    setIsLoading(true);

    if (user) {
      SavedShoeService.getAllSavedShoes(user.email)
        .then((response) => {
          console.log(response.data)
          setSavedShoes(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          setError(error);
          setIsLoading(false);
        });
    }
  }, [user]);

  const handleShoeIdChange = (value) => {
    setShoeId(value);

    if (!value) {
      setSelectedShoe(null);
      return;
    }

    SavedShoeService.getSavedShoe(value, user.email)
      .then((response) => {
        setSelectedShoe(response.data);
      })
      .catch((error) => {
        setSelectedShoe(null);
        setError(error);
      });
  }

  const handleSaveShoe = (event) => {
    event.preventDefault();
    setIsLoading(true);
    SavedShoeService.saveShoe(savedShoeName, user.email)
      .then((response) => {
        const newSavedShoe = response.data;
        setSavedShoes([...savedShoes, newSavedShoe]);
        console.log(newSavedShoe);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  };


  const handleViewPriceHistory = (savedShoe) => {

    setIsLoading(true);
    console.log(savedShoe.shoeId, savedShoe.email);
    navigate(`../display-graph/${encodeURIComponent(savedShoe.shoeId)}/${encodeURIComponent(savedShoe.email)}`);
  }

  const handleUpdatePrice = (event) => {
    event.preventDefault();
    setIsLoading(true);
    SavedShoeService.updateSavedShoePrice(updateShoeId, user.email)
      .then((response) => {
        const newSavedShoe = response.data;
        setSavedShoes((prevSavedShoes) =>
          prevSavedShoes.map((savedShoe) =>
            savedShoe.shoeId === newSavedShoe.shoeId ? newSavedShoe : savedShoe
          )
        );
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/';
  }



  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data. Please try again later.</div>;
  }
  return (
    <div className="saved-shoe-container">
      {user ? (
        <div>
          <div className="welcome">
          <p>Welcome {user.email}!</p>
          <button onClick={handleLogout}>Logout</button>
          </div>
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Price</th>
                <th>Date and Time</th>
                <th>Price History</th>
              </tr>
            </thead>
            <tbody>
              {savedShoes.map((savedShoe) => (
                <tr key={savedShoe.shoeId}>
                  <td>{savedShoe.shoeId}</td>
                  <td>{savedShoe.shoeName}</td>
                  <td>{savedShoe.shoePrice}</td>
                  <td>{savedShoe.dateAndTime}</td>
                  <td>
                    <button onClick={() => handleViewPriceHistory(savedShoe)}>View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <form onChange={(e) => handleShoeIdChange(e.target.value)} className="form-container">
            <label>
              Search By Shoe Id
              <div className="input-container">
                <input
                  type="text"
                  value={shoeId}          
                />
              </div>
            </label>
          </form>
          {selectedShoe && (
            <table>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Date and Time</th>
                </tr>
              </thead>
              <tbody>
                <tr key={selectedShoe.shoeId}>
                  <td>{selectedShoe.shoeId}</td>
                  <td>{selectedShoe.shoeName}</td>
                  <td>{selectedShoe.shoePrice}</td>
                  <td>{selectedShoe.dateAndTime}</td>
                </tr>
              </tbody>
            </table>
          )}
          <div className="form-container">
          <form onSubmit={handleSaveShoe} className="form-container">
            <label>
              Save Shoe By Shoe Name:
              <div className="input-container">
                <input
                  type="text"
                  value={savedShoeName}
                  onChange={(e) => setSavedShoeName(e.target.value)}
                />
                <button type="submit">Save Shoe</button>
              </div>
            </label>
          </form>
          <form onSubmit={handleUpdatePrice} className="form-container">
            <label>
              Update Price By Shoe Id
              <div className="input-container">
                <input
                  type="text"
                  value={updateShoeId}
                  onChange={(e) => setUpdateShoeId(e.target.value)}
                />
                <button type="submit">Update Price By Shoe ID</button>
              </div>
            </label>
          </form>
          </div>
        </div>
      ) : (
        <div>
          <p>Please log in to access this page.</p>
        </div>
      )}
    </div>
  );

}

export default SavedShoeComponent;