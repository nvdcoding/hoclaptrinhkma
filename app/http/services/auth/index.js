const appError = require("../../../helpers/error");
const bcrypt = require("bcrypt");
const { generate, verify } = require("../../../helpers/jwt");
const User = require("../../../models/User");
const Roles = require("../../../enums/Roles");
const Lesson = require("../../../models/Lesson");
const ProcessLearning = require("../../../models/ProcessLearning");

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
    const link = `http://${process.env.DOMAIN_API}active/${user._id}`;

    const mailContent = `Bạn vui lòng truy cập vào <a href="${link}">đây</a> hoặc truy cập ${link} (vì lí do bảo mật link có thể bị xóa, bạn vui lòng truy cập domain/active/${user._id})<br>Để kích hoạt tài khoản`;
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
  const user = await User.findOne({ email: email }).populate("courses").exec();
  const courses = user.courses.map((e) => {
    return {
      _id: e._id,
      name: e.name,
      img: e.img,
    };
  });
  const match = await bcrypt.compare(password, user.password);
  if (match) {
    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        roles: user.roles,
        courses: courses,
      },
      status: 200,
      message: "Login success",
    };
  } else {
    return {
      status: 400,
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
  if (user.status === "active") {
    return {
      status: 400,
      message: "Account is already active",
    }
  }
  await ProcessLearning.create({
    user: userId,
    process: [],
  });
  const result = await User.findOneAndUpdate(
    { _id: userId },
    { status: "active" }
  );
  return {
    status: 200,
    message: "Account is active",
  };
};
const forgetPassword = async (email) => {
  const check = await User.findOne({ email: email }).exec();
  if (!check) {
    return {
      status: 400,
      message: "Email not found",
    };
  }
  const accessTokenLife = process.env.ACCESS_TOKEN_LIFE || "1h";
  const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "nguyen-duy-kma";
  const resetToken = await generate(
    { _id: check._id, email },
    accessTokenSecret,
    accessTokenLife
  );
  await User.findOneAndUpdate(
    { email: email },
    { resetPasswordToken: resetToken }
  );
  try {
    const link = `http://${process.env.DOMAIN_API}forgot-password/${resetToken}`;
    const mailContent = `Bạn vui lòng truy cập vào <a href="${link}">đây</a> (vì lí do bảo mật link có thể bị xóa, bạn vui lòng truy cập domain/forgot-password/${resetToken})<br>Để đặt lại mật khẩu hoặc truy cập ${link}`;
    await mailer.sendMail(email, "Đặt lại mật khẩu", mailContent);
    return {
      status: 200,
      message: "success",
    };
  } catch (e) {
    console.log(e);
  }
};
const resetPassword = async ({ token, password, passwordConfirmation }) => {
  try {
    const accessTokenSecret =
      process.env.ACCESS_TOKEN_SECRET || "nguyen-duy-kma";
    const decoded = await verify(token, accessTokenSecret);
    const user = await User.findOne({ email: decoded.email }).exec();
    if (user.resetPasswordToken !== token) {
      return {
        status: 400,
        message: "Invalid token",
      };
    }
    const saltRounds = 10;
    const hash = bcrypt.hashSync(password, saltRounds);
    await User.findOneAndUpdate(
      { _id: decoded._id },
      {
        password: hash,
      }
    );
    return {
      status: 200,
      message: "success",
    };
  } catch (e) {
    console.log(e);
    return {
      status: 400,
      message: "Invalid token or expire",
    };
  }
};
module.exports = {
  signUp,
  signIn,
  activeAccount,
  forgetPassword,
  resetPassword,
};
