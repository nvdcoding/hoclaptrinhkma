const express = require("express");
const router = express.Router();
const {
  hasRoles,
  checkMod,
  isAuth,
} = require("../http/middlewares/auth/index");
const {
  createCourse,
  updateCourse,
  deleteCourse,
  getAllCourse,
  getOne,
} = require("../http/controllers/course");
const { getOneLesson } = require("../http/controllers/lesson");
router.get("/", getAllCourse);

router.get("/:courseId", getOne);

router.get("/:courseId/:id", isAuth, getOneLesson);

router.post("/", hasRoles(["ADMIN"]), createCourse);
router.put("/:id", hasRoles(["ADMIN", "MOD"]), checkMod, updateCourse);
router.delete("/:id", hasRoles(["ADMIN"]), deleteCourse);

module.exports = router;
