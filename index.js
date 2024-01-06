const express = require("express");
const db = require("./configs/mongoose");
const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.use("/", require("./routes/index"));

const PORT = 5000;
db.then(() => {
  console.log("Database connected");
  app.listen(PORT, () => {
    console.log("Server started successfully on PORT: ", PORT);
  });
});
