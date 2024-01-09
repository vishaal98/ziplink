import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import { Box, Button, CircularProgress } from "@mui/material";

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

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { name, email, password, confirmPassword } = formData;
    if (!name) {
      setErrors({
        // ...errors,
        name: "Name cannot be empty",
      });
      return;
    }
    if (!email) {
      setErrors({
        // ...errors,
        email: "Email cannot be empty",
      });
      return;
    }
    if (!password) {
      setErrors({
        // ...errors,
        password: "Password cannot be empty",
      });
      return;
    }

    // Password strength check
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!password || !passwordRegex.test(password)) {
      setErrors({
        ...errors,
        password:
          "Password must be at least 6 characters with at least one uppercase and one lowercase letter",
      });
      return;
    }

    if (password !== confirmPassword) {
      setErrors({
        // ...errors,
        password: "Passwords do not match",
      });
      return;
    }
    await registerUser();
  };

  const registerUser = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post("auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      console.log(response.data);
      if (!response.data.user) {
        setErrors({
          email: response.data.message,
        });
        throw Error;
      }
      localStorage.setItem(
        "token",
        JSON.stringify(response.data.tokens.access.token)
      );
      localStorage.setItem("user", JSON.stringify(response.data.user));
      setIsLoading(false);
      navigate("/home");
    } catch (err) {
      console.log("Error while registering: ", err);
    }
  };

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          maxWidth: "500px",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          backgroundColor: "#2c2435",
        }}
      >
        <TextField
          fullWidth
          label="Username"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={Boolean(errors.name)}
          helperText={errors.name}
          margin="normal"
          sx={{
            backgroundColor: "#322a3a",
          }}
          InputLabelProps={{
            sx: { color: "#ffffff" },
          }}
          InputProps={{
            sx: { color: "#ffffff" },
          }}
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={Boolean(errors.email)}
          helperText={errors.email}
          margin="normal"
          sx={{
            backgroundColor: "#322a3a",
          }}
          InputLabelProps={{
            sx: { color: "#ffffff" },
          }}
          InputProps={{
            sx: { color: "#ffffff" },
          }}
        />
        <TextField
          fullWidth
          type="password"
          label="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={Boolean(errors.password)}
          helperText={errors.password}
          margin="normal"
          sx={{
            backgroundColor: "#322a3a",
          }}
          InputLabelProps={{
            sx: { color: "#ffffff" },
          }}
          InputProps={{
            sx: { color: "#ffffff" },
          }}
        />
        <TextField
          fullWidth
          type="password"
          label="Confirm Password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={Boolean(errors.password)}
          // helperText={errors.password}
          margin="normal"
          sx={{
            backgroundColor: "#322a3a",
          }}
          InputLabelProps={{
            sx: { color: "#ffffff" },
          }}
          InputProps={{
            sx: { color: "#ffffff" },
          }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          {isLoading ? <CircularProgress /> : "SignUp"}
        </Button>
      </Box>
    </>
  );
};
