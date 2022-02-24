const express = require("express");
const router = express.Router();

const { search } = require("../http/controllers/search");

/* By USER*/
router.get("/", search);

module.exports = router;
