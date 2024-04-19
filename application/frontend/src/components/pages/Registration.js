import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
        
        const res = await response.json();
        
        if (response.status === 200) {
            const res = await response.json();
            alert("User created!");
            // Storing a JSON called user with properties token, username, email
            localStorage.setItem("user", JSON.stringify(res));
            navigate("/dashboard");
          } 
          else if (response.status === 409) {
            alert("Email exists");
          } 
          else {
            alert("An error occurred while registering");
          }
      }
      catch (error) {
        console.error('Error:', error.message);
      }
    } else {
      alert("Missing fields");
    }
  };


  const handleGuestLogin = async () => {
    try {
      const response = await axiosClient.post('/api/register/guest', {
        username: "Guest",
        password: "Guest"
      });
    //   const res = await response.json();
    //   if (response.status === 200){
    //     localStorage.setItem("user", JSON.stringify(res));
    //     navigate("/dashboard");        
    //   }
    //   else{
    //     alert("An error occured");
    //   }
      
    } 
    catch (error) {
      console.error('Error:', error.message);
    }
  };


  return (
    <div className="registrationForm">
      <h2 className="registrationtitle">Registration</h2>
      <form onSubmit={handleSubmit} className="registrationform">
        <TextField
          label="Email:"
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          errors={errors.email}
        />
        
        <TextField
          label="Username:"
          type="text"
          name="username"
          value={user.username}
          onChange={handleChange}
          errors={errors.username}
        />
      
        <TextField
          label="Password:"
          type="password"
          name="password"
          value={user.password}
          onChange={handleChange}
          errors={errors.password}
        />

        <TextField
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
            <label className="formlabel" for="agreeToTerms">
              I agree to the Terms of Service
            </label>
          </div>
          {errors.agreeToTerms && <div className="error">{errors.agreeToTerms}</div>}
        </div>
        <button className="registerbutton" type="submit">Register</button>
      </form>

      <div className="divider"></div>
      
      {/* <Link to="/dashboard" className="guestlink">Or continue as Guest</Link> */}
      <button className="guestlink" onClick={handleGuestLogin}>Or continue as Guest</button>
    </div>
  );
}

export default Registration;