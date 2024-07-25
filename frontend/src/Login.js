import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import validateLogin from "./LoginValidation";

const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
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
      const response = await axios.post("http://localhost:3030/auth", values);
      console.log(response.data);
      if (response.data.access_token) {
        const { role } = response.data.user;
        // Store the token in local storage (or context) if needed
        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        // Redirect based on role
        if (role === "artist") {
          navigate("/artisthome");
        } else if (role === "band") {
          navigate("/home");
        } else {
          navigate("/"); // Default fallback if role is not artist or band
        }
      } else {
        setErrors({
          email: "Invalid email or password",
          password: "Invalid email or password",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setErrors({ email: "An error occurred", password: "An error occurred" });
    }
  };

  return (
    <div className="back">
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <div className="input-box">
            <input
              type="text"
              placeholder="Email"
              name="email"
              value={values.email}
              onChange={handleInput}
            />
            {errors.email && (
              <span className="text-danger">{errors.email}</span>
            )}
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={values.password}
              onChange={handleInput}
            />
            {errors.password && (
              <span className="text-danger">{errors.password}</span>
            )}
          </div>
          <button type="submit">Login</button>
          <p className="register-container">
            <strong>Don't have an account?</strong>
            <br />
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
