const appError = require("../../../helpers/error");
const Excercise = require("../../../models/Excercise");
const Lesson = require("../../../models/Lesson");
const createExcercise = async (
  { lesson, question, description, cases },
  userId
) => {
  const check = await Lesson.findOne({ _id: lesson }).exec();
  if (!check) {
    return {
      status: 400,
      message: "Lesson not found",
    };
  }
  const excercises = check.excercises;
  const excercise = await Excercise.create({
    lesson,
    question,
    description,
    cases,
    created_by: userId,
    updated_by: userId,
  });
  excercises.push(excercise._id);
  const result = await Lesson.findOneAndUpdate(
    { _id: lesson },
    {
      excercises,
    }
  );
  return {
    status: 201,
    message: "create excercise success",
  };
};
const updateExcercise = async (
  { question, description, cases },
  userId,
  excercise
) => {
  const check = await Excercise.findById(excercise).exec();
  if (!check) {
    return {
      status: 400,
      message: "Excercise not found",
    };
  }
  const result = await Excercise.findOneAndUpdate(
    { _id: excercise },
    {
      question,
      description,
      cases,
      updated_by: userId,
      updated_at: Date.now(),
    }
  );
  return {
    status: 200,
    message: "update exercise success",
  };
};
const deleteExcercise = async (excerciseId) => {
  const check = await Excercise.findById(excerciseId).exec();
  if (!check) {
    return {
      status: 400,
      message: "Excercise not found",
    };
  }
  const lesson = await Lesson.findOne({ _id: check.lesson }).exec();
  if (!lesson) {
    return {
      status: 400,
      message: "Lesson not found",
    };
  }
  const excercises = lesson.excercises;
  const result = excercises.filter((e) => e != excerciseId);
  const excercise = await Excercise.findOneAndRemove({ _id: excerciseId });
  const result2 = await Lesson.findOneAndUpdate(
    { _id: check.lesson },
    {
      excercises: result,
    }
  );
  return {
    status: 200,
    message: "Delete excercise success",
  };
};
const getAllExcercise = async (id) => {
  const excercises = await Excercise.find({ lesson: id });
  return {
    data: excercises,
    status: 200,
    message: "find success",
  };
};
const getOneExcercise = async (id) => {
  const excercise = await Excercise.findOne({ _id: id }).exec();
  if (!excercise) {
    return {
      status: 400,
      message: "Excercise not found",
    };
  }
  return {
    data: excercise,
    status: 200,
    message: "find success",
  };
};
// const getLessonExcercise = async (id) => {
//   const lesson = await Lesson.findOne({ _id: id }).exec();
//   if (!lesson) {
//     return {
//       status: 400,
//       message: "No lesson found",
//     };
//   }
//   return {
//     data: lesson.excercises,
//     status: 200,
//     message: "get success",
//   };
// };
module.exports = {
  createExcercise,
  updateExcercise,
  deleteExcercise,
  getAllExcercise,
  getOneExcercise,
  // getLessonExcercise,
};
