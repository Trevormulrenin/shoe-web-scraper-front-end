import React, { useState } from 'react';
import loginService from '../services/LoginService'
import {useNavigate} from 'react-router-dom'
import '../Login.css'

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login(email, password);
      onLogin(user.email);
      localStorage.setItem('user', JSON.stringify(user));
      navigate('../saved-shoe')
    } catch (error) {
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <label className="login-label">Username:</label>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="login-input"
          placeholder="Email"
        />
        <label className="login-label">Password:</label>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="login-input"
          placeholder="Password"
        />
        <button type="submit" className="login-button">Login</button>
        {error && <p className="login-error">{error}</p>}
      </form>
    </div>
  );
};

export default Login;