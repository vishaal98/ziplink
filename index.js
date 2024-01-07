const express = require("express");
const db = require("./configs/mongoose");
const passport = require("passport");
const { jwtStrategy } = require("./configs/passport");
const helmet = require("helmet");
const cors = require("cors");
const app = express();
require("dotenv").config();
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
passport.use("jwt", jwtStrategy);
app.use(helmet());

app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.options("*", cors());

app.use("/", require("./routes/index"));

db.then(() => {
  console.log("Database connected");
  app.listen(process.env.PORT || 5000, () => {
    console.log("Server started successfully on PORT: ", process.env.PORT);
  });
});
