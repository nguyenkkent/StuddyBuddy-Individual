import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {useAuthContext} from '../../hooks/useAuthContext'
import axiosClient from '../../axiosClient';
import '../../css/Login.css';


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

  //grab the dispatch function from userAUth
  const {dispatch} = useAuthContext();
  
  // Can add validation here for backend, unless you have another way.
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axiosClient.post('/api/login', {
        email: loginData.email,
        password: loginData.password
      });
      // console.log(`login message: ${response.message}`);
      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(response.data));
        dispatch({ type: 'LOGIN', payload: response.data });
        const redirectTo = sessionStorage.getItem("redirectTo");
        sessionStorage.removeItem("redirectTo");
        navigate(redirectTo ?? "/dashboard");
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
    <form onSubmit={handleSubmit} className='loginform'>
      <h2 className="logintitle">Login</h2>
      <div>
        <label className="formgroup">Email:</label>
        <input className="forminput" type="email" name="email" value={loginData.email} onChange={handleInputChange} required />
      </div>
      <div>
        <label className="formgroup">Password:</label>
        <input className="forminput" type="password" name="password" value={loginData.password} onChange={handleInputChange} required />
      </div>
      <button className="loginsubmit" type="submit">Login</button>
    </form>
  );
}

export default Login;
