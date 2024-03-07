import React, { useState } from 'react';

function Login() {
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
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Login Successful', loginData);
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
