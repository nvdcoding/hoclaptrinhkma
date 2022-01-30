const express = require("express");
const router = express.Router();
const { isAuth } = require("../http/middlewares/isAuth");
const { isAdmin } = require("../http/middlewares/isAdmin");
const { createReport } = require("../http/controllers/report");

/* By USER*/
router.post("/report", createReport);

module.exports = router;
