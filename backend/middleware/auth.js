const jwt = require("jsonwebtoken");
module.exports = {
  // check token
  checkUserLogin: (req, res, next) => {
    let token = req.get("authorization");
    if (token) {
      // Remove Bearer from string
      token = token.slice(7);
      jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
          return res.json({
            success: false,
            code: 400,
            message: "Invalid Token! Please login",
          });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      return res.json({
        success: false,
        code: 401,
        message: "Access Denied! Please login.",
      });
    }
  },
}