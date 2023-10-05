const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const errorHandler = require("./middlewares/error-handler");
const { errors } = require("celebrate");

require("dotenv").config();

const { PORT = 3001 } = process.env;

const app = express();
mongoose.connect(
  "mongodb://127.0.0.1:27017/wtwr_db",
  () => {
    console.log("connected to db");
  },
  (e) => console.log("db error", e),
);
app.use(cors());
app.use(helmet());
app.use(express.json());
const routes = require("./routes");

app.use(routes);
app.use(errors());
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`App listening at ${PORT}`);
});
