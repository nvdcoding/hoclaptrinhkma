const appError = require("../../../helpers/error");
const Course = require("../../../models/Course");
const slug = require("slug");
const createCourse = async (
  { name, description, goal, img, requirement },
  userId
) => {
  const check = await Course.findOne({ name: name }).exec();
  if (check) {
    return {
      status: 400,
      message: "Course already exists",
    };
  }
  const course = await Course.create({
    name,
    description,
    goal,
    img,
    requirement,
    slug: slug(name),
    created_by: userId,
    updated_by: userId,
  });
  return {
    status: 201,
    message: "create course success",
  };
};
const updateCourse = async (
  { name, description, goal, img, requirement },
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
      goal,
      img,
      slug: slug(name),
      requirement,
      created_by: userId,
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
  const course = await Course.findByIdAndRemove(courseId);
  return {
    status: 200,
    message: "Delete course success",
  };
};
const getAllCourse = async () => {
  const courses = await Course.find({});
  return {
    data: courses,
    status: 200,
    message: "find success",
  };
};
const getOne = async (slug) => {
  const course = await Course.findOne({ slug: slug }).exec();
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
