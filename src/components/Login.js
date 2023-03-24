import React, { useState } from 'react';
import loginService from '../services/LoginService'
import {useNavigate} from 'react-router-dom'

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
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        placeholder="Password"
      />
      <button type="submit">Login</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default Login;
