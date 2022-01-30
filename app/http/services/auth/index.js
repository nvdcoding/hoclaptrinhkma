const appError = require("../../../helpers/error");
const bcrypt = require("bcrypt");
const { generate } = require("../../../helpers/jwt");
const User = require("../../../models/User");
const Roles = require("../../../enums/Roles");
const mailer = require("../../../helpers/mailer");
const signUp = async ({ name, email, password }) => {
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
  try {
    const link = `${process.env.DOMAIN_API}/auth/active/${user._id}`;
    const mailContent = `Bạn vui lòng truy cập link: ${link} <br>Để kích hoạt tài khoản`;
    await mailer.sendMail(email, "Kích hoạt tài khoản", mailContent);
  } catch (e) {
    console.log(e);
    return {
      status: 400,
      message: e,
    };
  }

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
const activeAccount = async (userId) => {
  const user = await User.findOne({ _id: userId }).exec();
  if (!user) {
    return {
      status: 400,
      message: "User not found",
    };
  }
  const result = await User.findOneAndUpdate(
    { _id: userId },
    { status: "active" }
  );
  return {
    status: 200,
    message: "Account is active",
  };
};
module.exports = {
  signUp,
  signIn,
  activeAccount,
};
