import './App.css';
import React, { useState } from 'react';

import Header from './components/Header'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ComparePrice from './components/ComparePrice';
import Login from './components/Login';
import NewLowest from './components/NewLowest';
import SavedShoe from './components/SavedShoe';
import Search from './components/Search';
import MostPopular from './components/MostPopular'
import DisplayGraph from './components/DisplayGraph'
import ScheduleShoe from './components/ScheduleShoe'

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (user) => {
    setUser(user);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
       <div className="App">
       <Header user={user} onLogout={handleLogout} />
       <Routes>
         <Route path="/login" element={<Login onLogin={handleLogin} />} />
         <Route path="/new-lowest" element={<NewLowest user={user} />} />
         <Route path="/saved-shoe" element={<SavedShoe user={user} />} />
         <Route path="/compare-price" element={<ComparePrice user={user} />} />
         <Route path="/search" element={<Search user={user} />} />
         <Route path="/most-popular" element={<MostPopular user={user} />} />
         <Route path="/display-graph/:shoeId/:email" element={<DisplayGraph user={user} />} />
         <Route path="/notify-me" element={<ScheduleShoe user ={user} />} />
       </Routes>
     </div>
    </Router>
  );
}

export default App;