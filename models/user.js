const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must enter a valid URL",
    },
  },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password,
) {
  return this.findOne({ email })
    .select("password")
    .then((user) => {
      if (!user) {
        const AuthenticationError = new Error("wrong user");
        AuthenticationError.name = "AuthenticationError";
        return Promise.reject(AuthenticationError);
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          const AuthenticationError = new Error("wrong pass");
          AuthenticationError.name = "AuthenticationError";
          return Promise.reject(AuthenticationError);
        }
        return user;
      });
    });
};

module.exports = mongoose.model("user", userSchema);
