const mongoose = require("mongoose");
const config = require("config");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 5,
    maxlength: 50,
    required: true,
    trim: true,
  },
 userid: {
    type: String,
    minlength: 5,
    maxlength: 50,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    minlength: 5,
    maxlength: 1050,
    required: true,
    trim: true,
  },

});

usersSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, name: this.name, expiresIn: 300 },
    config.get("jwtPrivateKey")
  );
  return token;
};

const User = mongoose.model("Users", usersSchema);
function validateUser(user) {
  const schema = {
    name: Joi.string().min(5).max(50).trim().required(),
   userid: Joi.string().min(5).max(50).required(),
    password: Joi.string().min(5).max(350).required(),
 


  };
  return Joi.validate(user, schema);
}

module.exports.User = User;
module.exports.validate = validateUser;
