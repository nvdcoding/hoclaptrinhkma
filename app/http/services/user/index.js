const appError = require("../../../helpers/error");
const User = require("../../../models/User");
const Course = require("../../../models/Course");
const Post = require("../../../models/Blog");
const Token = require("../../../models/Token");
const ProcessLearning = require("../../../models/ProcessLearning");
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
  const userProcess = await ProcessLearning.findOne({ user: userId }).exec();
  let processData = userProcess.process;
  processData.push({ courseId: courseId, process: [] });
  const process = await ProcessLearning.findOneAndUpdate(
    { user: userId },
    { process: processData }
  );
  return { data: userCourses, status: 200, message: "Add course success" };
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
const getStore = async (userId) => {
  const data = await User.findOne({ _id: userId }).populate({
    path: "storage",
    populate: {
      path: "author",
    },
  });
  console.log(data);
  return {
    data: data.storage,
    status: 200,
    message: "get store success",
  };
};
const removeStore = async ({ userId, postId }) => {
  const post = await Post.findOne({ _id: postId }).exec();
  if (!post) {
    return {
      status: 400,
      message: "Post not found",
    };
  }
  const user = await User.findOne({ _id: userId }).exec();
  if (!user) {
    return {
      status: 400,
      message: "user not found",
    };
  }
  const storage = user.storage;
  const result = storage.filter((e) => e !== postId);
  await User.findOneAndUpdate(
    { _id: userId },
    {
      storage: result,
    }
  );
  return {
    status: 200,
    message: "Remove success",
  };
};
const getProfile = async (id) => {
  const profile = await User.findOne({ _id: id }).exec();
  if (!profile) {
    return {
      status: 400,
      message: "get profile fail",
    };
  }
  return {
    data: profile,
    status: 200,
    message: "get profile success",
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
const setUser = async ({ userId, status, role }) => {
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
      status: status,
    }
  );
  return {
    status: 200,
    message: "Set user success",
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
const getOneUser = async (id) => {
  const profile = await User.findOne({ _id: id }).exec();
  if (!profile) {
    return {
      status: 400,
      message: "get user fail",
    };
  }
  return {
    data: profile,
    status: 200,
    message: "get user success",
  };
};
const getAllUser = async () => {
  const data = await User.find({}).exec();
  if (!data) {
    return {
      status: 400,
      message: "No users found",
    };
  }
  return {
    data: data,
    status: 200,
    message: "get list success",
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
  getProfile,
  getOneUser,
  getStore,
  getAllUser,
  removeStore,
  setUser,
};
