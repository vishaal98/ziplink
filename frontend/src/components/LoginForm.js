import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import { Dialog } from "@mui/material";
import { SignUp } from "./SignUp";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [openModal, setOpenModal] = useState(false);

  const validateForm = () => {
    let valid = true;
    const newErrors = { email: "", password: "" };

    if (!formData.email) {
      newErrors.email = "Email is required";
      valid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is Empty";
      valid = false;
    }
    setErrors(newErrors);

    return valid;
  };

  //login logic
  const loginUser = async () => {
    try {
      const response = await axios.post("auth/login", formData);
      console.log(response);
      if (!response.data.user) {
        setErrors({
          email: response.data.message,
        });
        throw Error;
      }
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem(
        "token",
        JSON.stringify(response.data.tokens.access.token)
      );
      console.log("Login successful");
      navigate("/home");
    } catch (err) {
      console.log("Error while logging in: ", err);
      setErrors({
        email: err.response.data.message,
        password: err.response.data.message,
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      await loginUser();
    } else {
      console.log("Login failed");
    }
  };

  const handleChange = (event) => {
    const { name, value, checked } = event.target;
    setFormData({
      ...formData,
      [name]: name === "rememberMe" ? checked : value,
    });
  };

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          maxWidth: "500px",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          backgroundColor: "#2c2435",
        }}
      >
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
          sx={{ mt: 2, backgroundColor: "#322a3a" }}
          InputLabelProps={{
            sx: { color: "#ffffff" },
          }}
          InputProps={{
            sx: { color: "#ffffff" },
          }}
        />
        {/* <FormControlLabel
          control={
            <Checkbox
              checked={formData.rememberMe}
              onChange={handleChange}
              name="rememberMe"
              color="primary"
            />
          }
          label="Remember Me"
          sx={{ mt: 1, textAlign: "left", color: "#939096" }}
        /> */}
        <Button
          type="submit"
          variant="contained"
          // color="#8f81f5"
          fullWidth
          sx={{ mt: 2, backgroundColor: "#8f81f5" }}
        >
          Login
        </Button>
        <Box sx={{ mt: 2, textAlign: "center" }}>
          {/* <Link href="#" variant="body2">
          Forgot Password?
        </Link> */}
          <Box mt={1} sx={{ color: "#939096" }}>
            Don't have an account?
            <Link href="#" variant="body2">
              <span onClick={() => setOpenModal(true)}>Sign Up</span>
            </Link>
          </Box>
        </Box>
      </Box>
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
};

export default LoginForm;
