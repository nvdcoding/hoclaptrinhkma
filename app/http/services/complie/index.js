const appError = require("../../../helpers/error");
const Excercise = require("../../../models/Excercise");
const Lesson = require("../../../models/Lesson");
const ProcessLearning = require("../../../models/ProcessLearning");
const axios = require("axios");

const resolveExc = async ({ idExc, answer, language }, userId) => {
  const check = await Excercise.findOne({ _id: idExc }).exec();
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
  const checkUser = await ProcessLearning.findOne({ user: userId }).exec();
  for (let i = 0; i < checkUser.process.length; i++) {
    if (checkUser.process[i].courseId === lesson.course.toString()) {
      for (let j = 0; j < checkUser.process[i].process.length; j++) {
        if (
          checkUser.process[i].process[j].lessonId === lesson._id.toString()
        ) {
          if (checkUser.process[i].process[j].excercise.includes(idExc)) {
            return {
              data: "",
              status: 400,
              message: "Excercise is already resolve",
            };
          }
        }
      }
    }
  }
  const cases = check.cases;
  const test = [];
  for (let i = 0; i < cases.length; i++) {
    const key = `case${i}`;
    const program = {
      script: answer.replace("/\n", ""),
      language: language,
      versionIndex: "0",
      clientId: process.env.JDOODLE_CLIENT_ID,
      clientSecret: process.env.JDOODLE_CLIENT_SECRET,
      stdin: cases[i].input.replace(",", " "),
    };
    await axios
      .post("https://api.jdoodle.com/v1/execute", program)
      .then(function (response) {
        let status = "";
        if (response.data.output == cases[i].output) {
          status = "pass";
        } else {
          status = "fail";
        }
        const result = {
          testcase: i + 1,
          status: status,
          result: response.data.output,
          expect: cases[i].output,
        };
        test.push(result);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  // check testcase pass
  let check2 = true;
  for (let i = 0; i < test.length; i++) {
    if (test[i].status == "fail") {
      check2 = false;
      break;
    }
  }
  if (check2) {
    const user = await ProcessLearning.findOne({ user: userId }).exec();
    const arr = user.process;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].courseId === lesson.course) {
        for (let j = 0; j < arr[i].process.length; j++) {
          if (arr[i].process[j].lessonId === lesson._id.toString()) {
            arr[i].process[j].excercise.push(idExc);
            break;
          }
        }
      }
    }
    // push to excercise
    await ProcessLearning.findOneAndUpdate(
      { user: userId },
      {
        process: arr,
      }
    );
  }

  return {
    data: test,
    status: 200,
    message: "success",
  };
};

module.exports = {
  resolveExc,
};
