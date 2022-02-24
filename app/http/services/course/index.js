const appError = require("../../../helpers/error");
const Course = require("../../../models/Course");
const createCourse = async (
  { name, description, path, goal, img, requirement },
  userId,
  language
) => {
  const check = await Course.findOne({
    name: name,
  }).exec();
  if (check) {
    return {
      status: 400,
      message: "Course already exists",
    };
  }
  try {
    const course = await Course.create({
      name,
      description,
      path,
      goal,
      img,
      requirement,
      language,
      created_by: userId,
      updated_by: userId,
    });
  } catch (e) {
    console.log(e);
  }

  return {
    status: 201,
    message: "create course success",
  };
};
const updateCourse = async (
  { name, description, path, goal, img, requirement, language },
  userId,
  courseId
) => {
  const check = await Course.findById(courseId).exec();
  if (!check) {
    return {
      status: 400,
      message: "Course not found",
    };
  }
  const course = await Course.findOneAndUpdate(
    { _id: courseId },
    {
      name,
      description,
      path,
      goal,
      img,
      requirement,
      language,
      updated_by: userId,
      updated_at: Date.now(),
    }
  );
  return {
    status: 200,
    message: "update course success",
  };
};
const deleteCourse = async (courseId) => {
  const check = await Course.findById(courseId).exec();
  if (!check) {
    return {
      status: 400,
      message: "Course not found",
    };
  }
  const course = await Course.findOneAndUpdate(
    { _id: courseId },
    { deleted_at: Date.now(), name: `${check.name}-deleted` }
  ); //TODO delete array
  return {
    status: 200,
    message: "Delete course success",
  };
};
const getAllCourse = async () => {
  const courses = await Course.find({ deleted_at: null });
  return {
    data: courses,
    status: 200,
    message: "find success",
  };
};
const getOne = async (id) => {
  const course = await Course.findOne({ _id: id }).exec();
  if (!course) {
    return {
      status: 400,
      message: "Course not found",
    };
  }
  return {
    data: course,
    status: 200,
    message: "find success",
  };
};
module.exports = {
  createCourse,
  updateCourse,
  deleteCourse,
  getAllCourse,
  getOne,
};
