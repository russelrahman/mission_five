const app = require("./app");
// import config
const config = require("./config/config");

// setup the server port from config.js file
const port = config.app.port;

// listen the port
app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
