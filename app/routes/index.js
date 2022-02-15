const authRouter = require("./auth");
const courseRouter = require("./course");
const userRouter = require("./user");
const reportRouter = require("./report");
const lessonRouter = require("./lesson");
const excerciseRouter = require("./excercise");
const blogRouter = require("./blog");
const commentRouter = require("./comment");
const complieRouter = require("./complie");
function route(app) {
  app.use("/api/auth", authRouter);
  app.use("/api/course", courseRouter);
  app.use("/api/user", userRouter);
  app.use("/api/report", reportRouter);
  app.use("/api/lesson", lessonRouter);
  app.use("/api/excercise", excerciseRouter);
  app.use("/api/blog", blogRouter);
  app.use("/api/comment", commentRouter);
  app.use("/api/complie/", complieRouter);
}

module.exports = route;
