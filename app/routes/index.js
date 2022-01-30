const authRouter = require("./auth");
const courseRouter = require("./course");
const userRouter = require("./user");
const reportRouter = require("./report");

function route(app) {
  app.use("/api/auth", authRouter);
  app.use("/api/course", courseRouter);
  app.use("/api/user", userRouter);
  app.use("/api/report", reportRouter);
}

module.exports = route;
