const express = require("express");
const router = express.Router();
const { isAuth } = require("../http/middlewares/isAuth");
const { isAdmin } = require("../http/middlewares/isAdmin");
const { createNotification } = require("../http/controllers/notification");

/* By USER*/
router.post("/notification", createNotification);

module.exports = router;
