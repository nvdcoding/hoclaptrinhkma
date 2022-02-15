const express = require("express");
const { hasRoles, checkMod, isAuth } = require("../http/middlewares/auth");
const router = express.Router();
const {
  getAllExcercise,
  getOneExcercise,
  createExcercise,
  updateExcercise,
  deleteExcercise,
} = require("../http/controllers/excercise");

router.get("/all/:id", isAuth, getAllExcercise);
router.get("/:id", isAuth, getOneExcercise);
// id: courseId,
router.post(
  "/:id/:lessonId",
  hasRoles(["ADMIN", "MOD"]),
  checkMod,
  createExcercise
);
router.put(
  "/:id/:lessonId/:excerciseId",
  hasRoles(["ADMIN", "MOD"]),
  checkMod,
  updateExcercise
);
router.delete("/:id", hasRoles(["ADMIN"]), deleteExcercise);
module.exports = router;
