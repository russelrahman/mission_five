require("dotenv").config();

// dev namer akta variable create krbo and app ar jonno port and db define krbo
const dev = {
  app: {
    port: process.env.PORT || 5000,
  },
  // db ar jonno akta object create krbo
  // env theke db url ta nibo jeta mongodb server ar sathe connect kra ... jodi server na thake tahole local db ar sathe connect hbe
  db: {
    url: process.env.DB_URL || "mongodb://localhost:27017/userDemoDB",
  },
};

module.exports = dev;
