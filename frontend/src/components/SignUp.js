import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleFormInput = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateFormData = async (event) => {
    event.preventDefault();
    const { name, email, password, confirmPassword } = formData;
    if (!name) {
      setErrors({
        ...errors,
        name: "Name cannot be empty",
      });
      return;
    }
    if (!email) {
      setErrors({
        ...errors,
        email: "Email cannot be empty",
      });
      return;
    }
    if (!password) {
      setErrors({
        ...errors,
        password: "Password cannot be empty",
      });
      return;
    }

    if (password != confirmPassword) {
      setErrors({
        ...errors,
        password: "Passwords do not match",
      });
      return;
    }
    await registerUser();
  };

  const registerUser = async () => {
    try {
      const response = await axios.post("auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      localStorage.setItem(
        "token",
        JSON.stringify(response.data.tokens.access.token)
      );
      localStorage.setItem("user", JSON.stringify(response.data.user));

      navigate("/home");
    } catch (err) {
      console.log("Error while registering: ", err);
      setErrors({
        email: err.response.data.message,
      });
    }
  };

  return (
    <form onSubmit={validateFormData}>
      <TextField
        // error
        error={errors.name}
        helperText={errors.name}
        placeholder="Enter name"
        label="Enter Name"
        name="name"
        value={formData.name}
        onChange={handleFormInput}
      />
      <TextField
        // error
        error={errors.email}
        helperText={errors.email}
        placeholder="Enter email"
        label="Enter Email"
        name="email"
        value={formData.email}
        onChange={handleFormInput}
      />
      <TextField
        type="password"
        error={errors.password}
        helperText={errors.password}
        placeholder="Enter password"
        label="Enter Password"
        name="password"
        value={formData.password}
        onChange={handleFormInput}
      />
      <TextField
        type="password"
        error={errors.confirmPassword}
        helperText={errors.confirmPassword}
        placeholder="Enter Confirm Password"
        label="Enter Confirm Password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleFormInput}
      />
      <button type="submit">Sign Up</button>
    </form>
  );
};
