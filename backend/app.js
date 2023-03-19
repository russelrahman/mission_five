const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
// connect db
require("./config/db");

// create express app
const app = express();

// front end theke api call krle jeno different port ar jonno error na ase tai cors use krbo
app.use(cors());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(cookieParser())

// import routes
const userRoute = require("./routes/userRoute");


// create user route
app.use("/api/v1/user", userRoute);

// define root route
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/./views/index.html");
});
// handling error route
app.use((req, res, next) => {
  res.status(404).json({
    message: "Route not Found",
  });
});
// handling server error
app.use((err, req, res, next) => {
  res.status(500).json({
    message: "Something Went Wrong",
  });
});
module.exports = app;
