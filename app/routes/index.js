const authRouter = require("./auth");
const courseRouter = require("./course");

function route(app) {
  app.use("/api/auth", authRouter);
  app.use("/api/course", courseRouter);
}

module.exports = route;
