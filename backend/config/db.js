const mongoose = require("mongoose");
// import config file
const config = require("./config");

// db url store krbo
const dbURL = config.db.url;

// connect mongodb
mongoose
  .connect(dbURL)
  .then(() => {
    console.log("MongoDB atlas is connected");
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
