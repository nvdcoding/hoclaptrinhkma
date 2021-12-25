const express = require("express");
const router = express.Router();
const { isAdmin } = require("../http/middlewares/isAdmin");
const {
  createCourse,
  updateCourse,
  deleteCourse,
  getAllCourse,
  getOne
} = require("../http/controllers/course");

router.get("/", getAllCourse);
router.get("/:slug", getOne);
router.post("/", isAdmin, createCourse);
router.put("/:id", isAdmin, updateCourse);
router.delete("/:id", isAdmin, deleteCourse);

module.exports = router;
