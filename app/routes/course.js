const express = require("express");
const router = express.Router();
const { hasRoles, checkMod } = require("../http/middlewares/auth/index");
const {
  createCourse,
  updateCourse,
  deleteCourse,
  getAllCourse,
  getOne,
} = require("../http/controllers/course");

router.get("/", getAllCourse);
router.get("/:slug", getOne);

router.post("/", hasRoles(["ADMIN"]), createCourse);
router.put("/:id", hasRoles(["ADMIN", "MOD"]), checkMod, updateCourse);
router.delete("/:id", hasRoles(["ADMIN"]), deleteCourse);

module.exports = router;
