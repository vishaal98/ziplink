import React, { useEffect } from "react";
import LoginForm from "../components/LoginForm";
import { Box, Typography } from "@mui/material";
import "../assets/landing.css";
import { useNavigate } from "react-router-dom";

export const LandingPage = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      navigate("/home");
    }
  }, []);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh", // Set minHeight instead of height
        textAlign: "center",
        backgroundColor: "#342d3c",
      }}
    >
      <Typography
        sx={{ color: "#8f81f5", fontSize: 50, fontFamily: "Helvetica" }}
      >
        ZipLink App
      </Typography>

      <LoginForm />
    </Box>
  );
};
