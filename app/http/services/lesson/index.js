const appError = require("../../../helpers/error");
const Lesson = require("../../../models/Lesson");
const Course = require("../../../models/Course");

const createLesson = async ({ name, part, link, course }, userId) => {
  const courseCheck = await Course.findOne({ _id: course }).exec();
  if (!courseCheck) {
    return {
      status: 400,
      message: "Course is not found",
    };
  }
  const lessonCheck = await Lesson.findOne({ name: name }).exec();
  if (lessonCheck) {
    return {
      status: 400,
      message: "Lesson already exists",
    };
  }
  try {
    const lesson = await Lesson.create({
      course,
      name,
      part,
      link,
      created_by: userId,
    });
    const lessonUpdate = courseCheck.lesson;
    lessonUpdate.push(lesson._id);
    const courseUpdated = await Course.findOneAndUpdate(
      { _id: course },
      {
        lesson: lessonUpdate,
      }
    );
    return {
      status: 201,
      message: "create lesson success",
    };
  } catch (e) {
    return {
      status: 400,
      message: "Create lesson fail",
    };
  }
};
const getOneLesson = async (courseId, id) => {
  const course = await Course.findOne({ _id: courseId }).exec();
  if (!course.lesson.includes(id)) {
    return {
      status: 400,
      message: "Lesson not found",
    };
  }
  const lesson = await Lesson.findOne({ _id: id })
    .populate("excercises")
    .exec();
  return {
    data: lesson,
    status: 200,
    message: "Get One success",
  };
};
const getLanguage = async (id) => {
  const lesson = await Lesson.findOne({ _id: id })
    .populate("course", "language")
    .exec();
  return {
    data: lesson.course.language,
    status: 200,
    message: "Get One success",
  };
};
const getAllLesson = async (id) => {
  const lessons = await Lesson.find({ course: id, deleted_at: null })
    .populate("excercises")
    .exec();
  return {
    data: lessons,
    status: 200,
    message: "Get All success",
  };
};
const deleteLesson = async (courseId, lessonId) => {
  const check = await Lesson.findById(lessonId).exec();
  if (!check) {
    return {
      status: 400,
      message: "Lesson not found",
    };
  }
  const course = await Course.findById(courseId).exec();
  if (!course) {
    return {
      status: 400,
      message: "Course not found",
    };
  }
  const lessons = course.lesson;
  const result = lessons.filter((e) => e != lessonId);
  const lesson = await Lesson.findOneAndUpdate(
    { _id: lessonId },
    {
      deleted_at: Date.now(),
    }
  );
  const courseUp = await Course.findOneAndUpdate(
    { _id: courseId },
    {
      lesson: result,
    }
  );
  return {
    status: 200,
    message: "Delete lesson success",
  };
};
const updateLesson = async ({ name, link }, userId, lessonId) => {
  const check = await Lesson.findById(lessonId).exec();
  if (!check) {
    return {
      status: 400,
      message: "Lesson not found",
    };
  }
  const lesson = await Lesson.findOneAndUpdate(
    { _id: lessonId },
    {
      name,
      link,
      updated_by: userId,
      updated_at: Date.now(),
    }
  );
  return {
    status: 200,
    message: "update lesson success",
  };
};
module.exports = {
  createLesson,
  getOneLesson,
  getAllLesson,
  deleteLesson,
  updateLesson,
  getLanguage,
};
