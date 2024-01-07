import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import { Dialog } from "@mui/material";
import { SignUp } from "./SignUp";

function LoginForm() {
  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
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
    const { email, password } = formData;
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

    await loginUser();
  };

  const loginUser = async () => {
    try {
      const response = await axios.post("auth/login", formData);
      console.log(response);

      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem(
        "token",
        JSON.stringify(response.data.tokens.access.token)
      );

      navigate("/home");
    } catch (err) {
      console.log("Error while logging in: ", err);
      setErrors({
        email: err.response.data.message,
        password: err.response.data.message,
      });
    }
  };

  return (
    <>
      <form onSubmit={validateFormData}>
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
        <button type="submit">Login</button>
        <div>
          New to ZipLink??
          <span
            onClick={() => {
              setOpenModal(true);
            }}
          >
            click here to register..
          </span>
        </div>
      </form>
      <Dialog
        open={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
      >
        <SignUp />
      </Dialog>
    </>
  );
}

export default LoginForm;
