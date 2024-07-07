import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import validateLogin from './LoginValidation'; // Import the validation function

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({});

    const handleInput = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
        setErrors({ ...errors, [name]: "" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate the form values
        const validationErrors = validateLogin(values);
        if (validationErrors.length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const response = await axios.post('http://localhost:8081/login', values);
            console.log(response.data);
            if (response.data.message === 'Success') {
                const { category } = location.state || { category: '' };
                navigate(category === 'artist' ? '/artisthome' : '/home');
            } else {
                setErrors({ email: "Invalid email or password", password: "Invalid email or password" });
            }
        } catch (error) {
            console.error('Error:', error);
            setErrors({ email: "An error occurred", password: "An error occurred" });
        }
    };

    return (
        <div className='back'>
            <div className='wrapper'>
                <form onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <div className="input-box">
                        <input type="text" placeholder='Email' name='email' value={values.email} onChange={handleInput} />
                        {errors.email && <span className='text-danger'>{errors.email}</span>}
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder='Password' name='password' value={values.password} onChange={handleInput} />
                        {errors.password && <span className='text-danger'>{errors.password}</span>}
                    </div>
                    <button type="submit">Login</button>
                    <p className="register-container">
                        <strong>Don't have an account?</strong><br />
                        <Link to="/register" className="register-button">
                            Register
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
