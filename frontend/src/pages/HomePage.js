import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { TextField } from "@mui/material";

export const HomePage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [shortenedURL, setShortURL] = useState("");
  const [url, setURL] = useState("");

  const handleFormInput = (event) => {
    setURL(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("links/shorten", { url });
      setShortURL(response.data.shortLink);
    } catch (err) {
      console.log("Error while shortening the URL: ", err);
    }
  };

  return (
    <>
      <div>Hi {user.name}</div>;
      <form onSubmit={handleFormSubmit}>
        <TextField
          placeholder="Enter the URL"
          label="Enter URL"
          name="url"
          value={url}
          onChange={handleFormInput}
        />
        <button type="submit">Shorten the URL</button>
      </form>
      <h4>
        Shortened URL:{" "}
        <a href={shortenedURL} target="_blank">
          {shortenedURL}
        </a>
      </h4>
    </>
  );
};
