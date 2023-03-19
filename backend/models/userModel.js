const mongoose = require("mongoose");
const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");

// user collection/table ar akta schema create krbo
const userSchema = new mongoose.Schema({
  id: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
    maxlength: 32,
    trim: true,
  },
  email:{
    type: String,
    require: true,
    trim: true,
    unique: true,
  },
  userPassword: {
    type: String,
    required: true
  },
  salt: String,
  // age: {
  //   type: Number,
  //   require: true,
  // },
}, {timestamps: true});
// hash and secure password
userSchema.virtual("password")
  .set(function(password) {
    this._password = password
    this.salt = uuidv4()
    this.userPassword = this.securePassword(password)
  })
  .get(function() {
    return this._password
  })

userSchema.methods = {
  authenticate: function(plainpassword) {
    return this.securePassword(plainpassword) === this.userPassword
  },

  securePassword: function(plainpassword) {
    if(!plainpassword) return "";

    try {
      return crypto.createHmac("sha256", this.salt).update(plainpassword).digest("hex")
    } catch (err) {
      return ""
    }
  }
}
// User hosse collection/table name and ai table userSchema ta follow kre data insert krbo
module.exports = mongoose.model("User", userSchema);
