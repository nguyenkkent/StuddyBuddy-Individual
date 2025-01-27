import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {useAuthContext} from '../../hooks/useAuthContext'
import axiosClient from '../../axiosClient';
import { Link } from 'react-router-dom';
import '../../css/Register.css';
import TextField from '../common/TextField';


function Registration() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  }); 
  
  const [errors, setErrors] = useState({});
  //grab the dispatch function from userAUth
  const {dispatch} = useAuthContext();

  // Handles changes in the form's fields, like checking the box or types in a field box
  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setUser({
      ...user,
      [name]: name === 'agreeToTerms' ? checked : value,
    });
  };

  const validateForm = () => {
    let formIsValid = true;
    let errors = {};

    // Email validation
    if (!user.email) {
      formIsValid = false;
      errors['email'] = 'Email is required.';
    }

    // Username validation
    if (!user.username) {
      formIsValid = false;
      errors['username'] = 'Username is required.';
    }

    // Password validation
    if (!user.password) {
      formIsValid = false;
      errors['password'] = 'Password is required.';
    }

    // Confirm password validation
    if (!user.confirmPassword) {
      formIsValid = false;
      errors['confirmPassword'] = 'Confirming the password is required.';
    }

    // Password match validation
    if (user.password !== user.confirmPassword) {
      formIsValid = false;
      errors['passwordMatch'] = 'Passwords do not match.';
    }

    // Agree to terms validation
    if (!user.agreeToTerms) {
      formIsValid = false;
      errors['agreeToTerms'] = 'You must agree to the terms.';
    }

    setErrors(errors);
    return formIsValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axiosClient.post('/api/register', {
          username: user.username,
          password: user.password,
          email: user.email
        });
        //console.log(response.data);
        if (response.status === 200) {
          localStorage.setItem("user", JSON.stringify(response.data));
          dispatch({ type: 'LOGIN', payload: response.data });
          navigate("/dashboard");
        } else {
          alert(response.message);
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    } else {
      alert("Missing fields");
    }
  };
  

const handleGuestLogin = async (e) => {
    e.preventDefault();
    
    try {
      axiosClient.post('/api/register/guest', {
        username: "Guest",
        password: "Guest"
      })
      .then(response => {
        if (response.status === 200){
          localStorage.setItem("user", JSON.stringify(response.data));
          dispatch({type: 'LOGIN', payload: response.data})
          navigate("/dashboard");        
        }
        else{
          alert("An error occurred");
        }
      })
      .catch(error => {
        console.error('Error:', error.message);
      });
    } 
    catch (error) {
      console.error('Error:', error.message);
    }
  };


  return (
    <div className="registrationContent">
      <div className="registrationForm">
        <h2 className="registrationtitle">Registration</h2>
        <form onSubmit={handleSubmit} className="registrationform">
          <TextField
            id="email"
            label="Email:"
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            errors={errors.email}
          />
          
          <TextField
            id="username"
            label="Username:"
            type="text"
            name="username"
            value={user.username}
            onChange={handleChange}
            errors={errors.username}
          />
        
          <TextField
            id="password"
            label="Password:"
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            errors={errors.password}
          />

          <TextField
            id="confirmPassword"
            label="Confirm Password:"
            type="password"
            name="confirmPassword"
            value={user.confirmPassword}
            onChange={handleChange}
            errors={[errors.confirmPassword, errors.passwordMatch]}
          />

          <div>
            <div className='agreeBox'>
              <input type="checkbox" name="agreeToTerms" id="agreeToTerms" checked={user.agreeToTerms} onChange={handleChange} />
              <label className="formlabel" htmlFor="agreeToTerms">
                I agree to the Terms of Service
              </label>
            </div>
            {errors.agreeToTerms && <div className="error">{errors.agreeToTerms}</div>}
          </div>
          <button className="registerbutton" type="submit">Register</button>
          <div className="divider"></div>
          <button className="guestlink" onClick={handleGuestLogin}>Or continue as Guest</button>
        </form>
      </div>
    </div>
  );
}

export default Registration;