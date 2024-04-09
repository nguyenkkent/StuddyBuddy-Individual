import React, { useState } from 'react';
import axios from "axios";

function Registration() {
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
        const response = await axios.post('http://localhost:3001/api/register', {
          username: user.username,
          password: user.password,
          email: user.email
        });
  
        if (response.status === 200) {
          alert("User created!");
        } 
        else if (response.status === 409) {
          alert("Email exists");
        }
      }
      catch (error) {
        console.error('Error:', error.message);
      }
    } else {
      alert("Missing fields");
    }
  };

  return (
    <div className="registrationForm">
      <h2>Registration</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={user.email} onChange={handleChange} />
          {errors.email && <div className="error">{errors.email}</div>}
        </div>
        <div>
          <label>Username:</label>
          <input type="text" name="username" value={user.username} onChange={handleChange} />
          {errors.username && <div className="error">{errors.username}</div>}
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={user.password} onChange={handleChange} />
          {errors.password && <div className="error">{errors.password}</div>}
        </div>
        <div>
          <label>Confirm Password:</label>
          <input type="password" name="confirmPassword" value={user.confirmPassword} onChange={handleChange} />
          {errors.confirmPassword && <div className="error">{errors.confirmPassword}</div>}
          {errors.passwordMatch && <div className="error">{errors.passwordMatch}</div>}
        </div>
        <div>
          <label>
            <input type="checkbox" name="agreeToTerms" checked={user.agreeToTerms} onChange={handleChange} />
            I agree to the Terms of Service
          </label>
          {errors.agreeToTerms && <div className="error">{errors.agreeToTerms}</div>}
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Registration;
