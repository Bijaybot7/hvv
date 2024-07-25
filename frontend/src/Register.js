import React, { useState } from "react";
import "./Register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import validateRegisterForm from "./RegisterValidation";

const Register = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const [errors, setErrors] = useState({});

  const handleInput = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted"); // Check if form is submitted

    const validationErrors = validateRegisterForm(values);
    console.log("Validation errors:", validationErrors); // Check validation errors
    setErrors(validationErrors);

    // Only proceed if there are no validation errors
    if (
      Object.keys(validationErrors).every((key) => validationErrors[key] === "")
    ) {
      try {
        console.log("Submitting:", values); // Check values being submitted
        const response = await axios.post(
          "http://localhost:3030/users",
          values
        );
        console.log(response.data);

        // Customize alert message based on the selected role
        if (values.role === "artist") {
          alert("Successfully Registered as Artist!");
        } else if (values.role === "band") {
          alert("Successfully Registered as Band!");
        }

        // Navigate to the login page after successful registration
        navigate("/", { state: { role: values.role } });
      } catch (error) {
        console.error("Error:", error);
        // Handle error cases (e.g., display an error message to the user)
        alert("Registration failed. Please try again.");
      }
    }
  };

  return (
    <div className="back">
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <h1>Register</h1>
          <div className="input-box">
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={values.name}
              onChange={handleInput}
            />
            {errors.name && <span className="text-danger">{errors.name}</span>}
          </div>
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
          <div className="input-box">
            <label>Choose Role:</label>
            <select
              value={values.role}
              onChange={handleInput}
              name="role"
              required
            >
              <option value="">Select Role</option>
              <option value="band">Band</option>
              <option value="artist">Artist</option>
            </select>
            {errors.role && <span className="text-danger">{errors.role}</span>}
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
