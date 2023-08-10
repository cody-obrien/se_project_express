const express = require("express");
const mongoose = require("mongoose");

const { PORT = 3001 } = process.env;

const app = express();
mongoose.connect(
  "mongodb://127.0.0.1:27017/wtwr_db",
  () => {
    console.log("connected to db");
  },
  (e) => console.log("db error", e),
);

const routes = require("./routes");

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: "64d3cc6c201a31b9c68ee9ba", // paste the _id of the test user created in the previous step
  };
  next();
});
app.use(routes);

app.listen(PORT, () => {
  console.log(`App listening at ${PORT}`);
});
