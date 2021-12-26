const authRouter = require("./auth");
const courseRouter = require("./course");
const userRouter = require("./user");

function route(app) {
  app.use("/api/auth", authRouter);
  app.use("/api/course", courseRouter);
  app.use("/api/user", userRouter);
}

module.exports = route;
