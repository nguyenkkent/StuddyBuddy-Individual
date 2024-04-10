import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  // Can add validation here for backend, unless you have another way.
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/login', {
        email: loginData.email,
        password: loginData.password
      });
      console.log(`login message: ${response.message}`);
      if (response.status === 200) {
        navigate('/api/dashboard');
      }
      else {
        alert(response.message);
      }
    }
    catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div>
        <label>Email:</label>
        <input type="email" name="email" value={loginData.email} onChange={handleInputChange} required />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" name="password" value={loginData.password} onChange={handleInputChange} required />
      </div>
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
