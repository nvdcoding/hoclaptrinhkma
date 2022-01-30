const appError = require("../../../helpers/error");
const User = require("../../../models/User");
const Course = require("../../../models/Course");
const Post = require("../../../models/Post");
const Token = require("../../../models/Token");
const bcrypt = require("bcrypt");
/* by USER */
const updateUser = async ({ name, bio, avatar, social }, userId) => {
  const check = await User.findOne({ _id: userId }).exec();
  if (!check) {
    return {
      status: 404,
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
      status: 404,
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
const addCourse = async (courseId, userId) => {
  const course = await Course.findOne({ _id: courseId }).exec();
  const user = await User.findOne({ _id: userId }).exec();
  if (!course) {
    return {
      status: 404,
      message: "Course not found",
    };
  }
  if (!user) {
    return {
      status: 404,
      message: "User not found",
    };
  }
  const userCourses = user.courses;
  if (userCourses.includes(courseId)) {
    return {
      status: 400,
      message: "Course exist",
    };
  }
  userCourses.push(courseId);
  const result = await User.findOneAndUpdate(
    {
      _id: userId,
    },
    {
      courses: userCourses,
    }
  );
  return {
    status: 200,
    message: "Add course success",
  };
};
const storePost = async (postId, userId) => {
  const post = await Post.findOne({ _id: postId }).exec();
  const user = await User.findOne({ _id: userId }).exec();
  if (!post) {
    return {
      status: 404,
      message: "Post not found",
    };
  }
  if (!user) {
    return {
      status: 404,
      message: "User not found",
    };
  }
  const userPosts = user.storage;
  if (userPosts.includes(postId)) {
    return {
      status: 400,
      message: "Post exist",
    };
  }
  userPosts.push(postId);
  const result = await User.findOneAndUpdate(
    {
      _id: userId,
    },
    {
      storage: userPosts,
    }
  );
  return {
    status: 200,
    message: "Store post success",
  };
};
/*by ADMIN */
const setUserStatus = async ({ status, userId }) => {
  const check = await User.findOne({ _id: userId }).exec();
  if (!check) {
    return {
      status: 404,
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
      status: 404,
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
const setModCourse = async ({ userId, course }) => {
  const checkUser = await User.findOne({ _id: userId }).exec();
  const checkCourse = await Course.findOne({ _id: course }).exec();
  if (!checkCourse) {
    return {
      status: 404,
      message: "Course not found",
    };
  }
  if (!checkUser) {
    return {
      status: 404,
      message: "User not found",
    };
  }
  if (checkUser.roles !== "MOD") {
    return {
      status: 400,
      message: "User's Role invalid",
    };
  }
  const courses = checkUser.courses;
  if (courses.includes(course)) {
    return {
      status: 400,
      message: "Course exist",
    };
  }
  courses.push(course);
  const result = await User.findOneAndUpdate(
    { _id: userId },
    { courses: courses }
  );
  return {
    status: 200,
    message: "Set Mod Course success",
  };
};
const deleteUser = async (id) => {
  const check = await User.findOne({ _id: id }).exec();
  if (!check) {
    return {
      status: 404,
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
  addCourse,
  storePost,
  setUserStatus,
  setUserRole,
  setModCourse,
  deleteUser,
};
