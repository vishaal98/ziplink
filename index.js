const express = require("express");
const db = require("./configs/mongoose");
const app = express();
require("dotenv").config();
app.use(express.json());
// app.use(express.urlencoded());

app.use("/", require("./routes/index"));

db.then(() => {
  console.log("Database connected");
  app.listen(process.env.PORT || 5000, () => {
    console.log("Server started successfully on PORT: ", process.env.PORT);
  });
});
