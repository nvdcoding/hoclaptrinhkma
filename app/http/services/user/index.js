const appError = require("../../../helpers/error");
const User = require("../../../models/User");
const Token = require("../../../models/Token");
const bcrypt = require("bcrypt");
/* by USER */
const updateUser = async ({ name, bio, avatar, social }, userId) => {
  const check = await User.findOne({ _id: userId }).exec();
  if (!check) {
    return {
      status: 400,
      message: "User not found",
    };
  }
  const user = await User.findOneAndUpdate(
    { _id: userId },
    {
      name,
      bio,
      avatar,
      social,
    }
  );
  return {
    status: 201,
    message: "update user success",
  };
};
const changePassword = async ({ oldPassword, password }, userId) => {
  const user = await User.findOne({ _id: userId }).exec();
  if (!user) {
    return {
      status: 400,
      message: "User not found",
    };
  }
  const match = await bcrypt.compare(oldPassword, user.password);
  if (match) {
    const saltRounds = 10;
    const hash = bcrypt.hashSync(password, saltRounds);
    await User.findOneAndUpdate(
      { _id: userId },
      {
        password: hash,
      }
    );
    return {
      status: 200,
      message: "Change password success",
    };
  } else {
    return {
      status: 400,
      message: "Password is wrong",
    };
  }
};
/*by ADMIN */
const setUserStatus = async ({ status, userId }) => {
  const check = await User.findOne({ _id: userId }).exec();
  if (!check) {
    return {
      status: 400,
      message: "User not found",
    };
  }
  if (check.roles === "ADMIN") {
    return {
      status: 400,
      message: "Cant not change admin",
    };
  }
  const user = await User.findOneAndUpdate(
    {
      _id: userId,
    },
    {
      status: status,
    }
  );
  return {
    status: 200,
    message: "Update user status success",
  };
};
const setUserRole = async ({ role, userId }) => {
  const check = await User.findOne({ _id: userId }).exec();
  if (!check) {
    return {
      status: 400,
      message: "User not found",
    };
  }
  if (check.roles === "ADMIN") {
    return {
      status: 400,
      message: "Cant not change admin",
    };
  }
  const user = await User.findOneAndUpdate(
    {
      _id: userId,
    },
    {
      roles: role,
    }
  );
  return {
    status: 200,
    message: "Update user role success",
  };
};
const deleteUser = async (id) => {
  const check = await User.findOne({ _id: id }).exec();
  if (!check) {
    return {
      status: 400,
      message: "User not found",
    };
  }
  if (check.roles === "ADMIN") {
    return {
      status: 400,
      message: "Cant not delete admin",
    };
  }
  const user = await User.findOneAndRemove({
    _id: id,
  });
  const token = await Token.deleteOne({ user: id });
  return {
    status: 200,
    message: "delete user success",
  };
};

module.exports = {
  updateUser,
  changePassword,
  setUserStatus,
  setUserRole,
  deleteUser,
};
