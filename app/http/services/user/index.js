const appError = require("../../../helpers/error");
const User = require("../../../models/User");
const Course = require("../../../models/Course");
const Post = require("../../../models/Blog");
const Token = require("../../../models/Token");
const ProcessLearning = require("../../../models/ProcessLearning");
const Lesson = require("../../../models/Lesson");
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
  const course = await Course.findOne({
    _id: courseId,
    deleted_at: null,
  }).exec();
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
  const lesson = await Lesson.findOne({ course: courseId }).exec();
  let processData = userProcess.process;
  const obj = {
    lessonId: lesson._id,
    excercise: [],
  };
  const childProcess = [];
  childProcess.unshift(obj);
  processData.push({
    courseId: courseId,
    process: childProcess,
  });
  const process = await ProcessLearning.findOneAndUpdate(
    { user: userId },
    { process: processData }
  );
  const data = await User.findOne({ _id: userId })
    .populate("courses", "_id img name")
    .exec();
  const result2 = data.courses.map((e) => {
    return {
      _id: e._id.toString(),
      name: e.name,
      img: e.img,
    };
  });
  return { data: result2, status: 200, message: "Add course success" };
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
const getProcess = async ({ userId, courseId }) => {
  const lesson = await Lesson.find({ course: courseId })
    .populate("excercises", "name link excercises")
    .exec();
  const userProcess = await ProcessLearning.findOne({
    user: userId,
    deleted_at: null,
  }).exec();
  const lessonProcess = userProcess.process
    .filter((e) => e.courseId === courseId)
    .map((e) => e.process);
  const result = lesson.map((e) => {
    if (lessonProcess[0].includes(e._doc._id.toString())) {
      return {
        ...e._doc,
        status: true,
      };
    } else {
      return {
        ...e._doc,
        status: false,
      };
    }
  });
  let c = 0;
  for (let i = 0; i < result.length; i++) {
    if (result[i].status) {
      c++;
    }
  }
  return {
    data: result,
    count: c,
    status: 200,
    message: "get process success",
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
  const data = await User.find({});
  return {
    data: data,
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
  const courses = checkUser.manage;
  if (courses.includes(course)) {
    return {
      status: 400,
      message: "Course exist",
    };
  }
  courses.push(course);
  const result = await User.findOneAndUpdate(
    { _id: userId },
    { manage: courses }
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
  const data = await User.find({}).exec();
  return {
    data: data,
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
  getProcess,
};
