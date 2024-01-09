import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import {
  Box,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [shortenedURL, setShortURL] = useState("");
  const [url, setURL] = useState("");
  const [links, setLinks] = useState(user.links);
  const [isLoading, setIsLoading] = useState(false);

  const handleFormInput = (event) => {
    setURL(event.target.value);
  };

  const getAllLinks = async () => {
    try {
      const response = await axios.get("links/mylinks");
      setLinks(response.data.allLinks);
    } catch (err) {
      console.log("Error while fetching all links: ", err);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post("links/shorten", { url });
      setShortURL(response.data.shortLink);
      await getAllLinks();
      setIsLoading(false);
    } catch (err) {
      console.log("Error while shortening the URL: ", err);
    }
  };

  //get all links when user logs in
  useEffect(() => {
    getAllLinks();
  }, []);

  //log out user
  const logOut = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
          height: "1vh",
          padding: "20px 50px",
          backgroundColor: "#342d3c",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            color: "#8f81f5",
          }}
          onClick={logOut}
        >
          <LogoutIcon />
          Logout
        </div>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          minHeight: "100vh", // Set minHeight instead of height
          textAlign: "center",
          backgroundColor: "#342d3c",
        }}
      >
        <Box
          sx={{
            padding: "100px",
          }}
        >
          <Typography
            variant="body1"
            style={{
              fontFamily: "Helvetica, Arial, sans-serif",
              color: "#939096",
            }}
          >
            <h3>Hi {user.name}</h3>
            <h1>
              Welcome to{" "}
              <Typography
                sx={{ color: "#8f81f5", display: "inline", fontSize: 50 }}
              >
                ZipLink
              </Typography>
            </h1>
            <h4>Shorten the long URL below!!</h4>
          </Typography>

          <form
            onSubmit={handleFormSubmit}
            style={{ display: "flex", alignItems: "baseline" }}
          >
            <TextField
              placeholder="Enter the URL"
              label="Enter URL"
              name="url"
              value={url}
              onChange={handleFormInput}
              style={{ flex: "1", marginRight: "10px", marginBottom: "0" }}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ height: "100%" }}
              style={{
                height: "fit-content",
                alignSelf: "baseline",
                backgroundColor: "#8f81f5",
              }}
            >
              {isLoading ? <CircularProgress size={25} /> : "Shorten"}
            </Button>
          </form>

          {shortenedURL && (
            <Typography
              style={{
                fontFamily: "Helvetica, Arial, sans-serif",
                color: "#939096",
                padding: "10px",
              }}
            >
              Shortened URL:{" "}
              <a href={shortenedURL} target="_blank">
                {shortenedURL}
              </a>
            </Typography>
          )}
        </Box>
        {/* <Grid container spacing={2}>
          <Grid item>
            <Typography
              sx={{ mt: 4, mb: 2, color: "#8f81f5" }}
              variant="h4"
              component="div"
            >
              Your Links
            </Typography>
            <List style={{ color: "#939096" }}>
              {links.map((link, index) => {
                return (
                  <ListItem key={index}>
                    <a
                      href={link.shortURL}
                      target="_blank"
                      style={{ color: "#939096" }}
                    >
                      <ListItemText primary={link.shortURL} />
                    </a>
                  </ListItem>
                );
              })}
            </List>
          </Grid>
        </Grid> */}
        {links.length > 0 && (
          <TableContainer
            component={Paper}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-start",
              minHeight: "100vh", // Set minHeight instead of height
              textAlign: "center",
              backgroundColor: "#342d3c",
              width: "800px",
            }}
          >
            <Typography
              sx={{ mt: 4, mb: 2, color: "#8f81f5" }}
              variant="h4"
              component="div"
            >
              Your Links
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ color: "#939096" }}>
                    Shortened URL
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {links.map((link, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <a
                        href={link.shortURL}
                        target="_blank"
                        style={{ color: "#939096" }}
                      >
                        {link.shortURL}
                      </a>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </>
  );
};
