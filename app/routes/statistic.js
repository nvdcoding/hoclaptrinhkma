const express = require("express");
const router = express.Router();

const { getTopAuthor, getTopCourse } = require("../http/controllers/statistic");

/* By USER*/
router.get("/author", getTopAuthor);
router.get("/course", getTopCourse);

module.exports = router;
