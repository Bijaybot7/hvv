import React, { useState } from 'react';
import './Register.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import validateRegisterForm from './RegisterValidation';

const Register = () => {
  const navigate = useNavigate();
  
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    category: '',
  });

  const [errors, setErrors] = useState({});

  const handleInput = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateRegisterForm(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).every(key => validationErrors[key] === "")) {
      try {
        const response = await axios.post('http://localhost:8081/register', values);
        console.log(response.data);
        
        // Customize alert message based on the selected category
        if (values.category === 'artist') {
          alert('Successfully Registered as Artist!');
        } else if (values.category === 'band') {
          alert('Successfully Registered as Band!');
        }
        
        // Navigate to the login page after successful registration
        navigate('/', { state: { category: values.category } });
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
    <div className='back'>
      <div className='wrapper'>
        <form onSubmit={handleSubmit}>
          <h1>Register</h1>
          <div className="input-box">
            <input type="text" placeholder='Name' name='name' value={values.name} onChange={handleInput} />
            {errors.name && <span className='text-danger'>{errors.name}</span>}
          </div>
          <div className="input-box">
            <input type="text" placeholder='Email' name='email' value={values.email} onChange={handleInput} />
            {errors.email && <span className='text-danger'>{errors.email}</span>}
          </div>
          <div className="input-box">
            <input type="password" placeholder='Password' name='password' value={values.password} onChange={handleInput} />
            {errors.password && <span className='text-danger'>{errors.password}</span>}
          </div>
          <div className="input-box">
            <label>Choose Category:</label>
            <select value={values.category} onChange={handleInput} name="category" required>
              <option value="">Select Category</option>
              <option value="band">Band</option>
              <option value="artist">Artist</option>
            </select>
            {errors.category && <span className='text-danger'>{errors.category}</span>}
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
