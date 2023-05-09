import React, { useState } from 'react';
import CreateUserService from '../services/CreateUserService';

const CreateUserComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await CreateUserService.createUser(email, password);
      console.log('User created successfully!');
      alert('User created successfully!');
      setTimeout(() => {
        window.location.href = '/login';
      }, 1500);
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <>
      <form className="create-user-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

      </form>
      <button className="login-button" onClick={handleSubmit}>Create User</button>
    </>
  );
};

export default CreateUserComponent;
