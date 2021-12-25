const appError = require("../../../helpers/error");
const bcrypt = require("bcrypt");
const { generate } = require("../../../helpers/jwt");
const User = require("../../../models/User");
const Roles = require("../../../enums/Roles");

const signUp = async ({ name, email, password, confirmCode }) => {
  const check = await User.findOne({ email: email }).exec();
  if (check) {
    return {
      status: 400,
      message: "Email already in use",
    };
  }
  const saltRounds = 10;
  const hash = bcrypt.hashSync(password, saltRounds);
  const user = await User.create({
    name: name,
    email: email,
    password: hash,
    roles: Roles.USER,
  });
  return {
    data: {
      id: user._id,
      name: user.name,
      email: user.email,
      roles: user.roles,
    },
    status: 201,
    message: "sign-up success",
  };
};
const signIn = async ({ email, password }) => {
  const user = await User.findOne({ email: email }).exec();
  if (!user) {
    return {
      status: 400,
      message: "User not found",
    };
  }
  const match = await bcrypt.compare(password, user.password);
  if (match) {
    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        roles: user.roles,
      },
      status: 200,
      message: "Login success",
    };
  } else {
    return {
      status: 401,
      message: "Password is incorrect",
    };
  }
};
module.exports = {
  signUp,
  signIn,
};
