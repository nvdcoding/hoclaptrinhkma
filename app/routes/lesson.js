const express = require("express");
const { hasRoles, checkMod, isAuth } = require("../http/middlewares/auth");
const router = express.Router();
const {
  createLesson,
  deleteLesson,
  getAllLesson,
  getOneLesson,
  updateLesson,
} = require("../http/controllers/lesson");

router.get("/:id", getAllLesson);

// id: courseId
router.post("/:id", hasRoles(["ADMIN", "MOD"]), checkMod, createLesson);
router.put(
  "/:id/:lessonId",
  hasRoles(["ADMIN", "MOD"]),
  checkMod,
  updateLesson
);
//
router.delete("/:id/:lessonId", hasRoles(["ADMIN"]), deleteLesson);

module.exports = router;
