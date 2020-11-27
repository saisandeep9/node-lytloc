const mongoose = require("mongoose");
const config = require("config");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const tokenSchema = new mongoose.Schema({

 token: {
    type: String,
    minlength: 5,
    maxlength: 950,
    trim: true,
  },
 expire_time: {
     type: Date,
    // default:new Date().setMinutes(new Date().getMinutes()+5)

  
  },

});


tokenSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, token: this.token },
    config.get("jwtPrivateKey")
  );
  return token;
};






const Token = mongoose.model("Tokens", tokenSchema);
// function validateUser(token) {
//   const schema = {
//     token: Joi.string().min(5).max(250).required(),
  
//   };
//   return Joi.validate(token, schema);
// }

module.exports.Token = Token;
// module.exports.validate = validateUser;