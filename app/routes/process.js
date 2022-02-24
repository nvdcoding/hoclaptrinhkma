const express = require("express");
const router = express.Router();
const { hasRoles, isAuth } = require("../http/middlewares/auth");
const {
  createReport,
  handleReport,
  getAllReport,
} = require("../http/controllers/report");

/* By USER*/
router.post("/", isAuth, createReport);

router.put("/", hasRoles(["ADMIN", "MOD"]), handleReport); // 1: xoa bai viet, 2 khoa bai viet
router.get("/", hasRoles(["ADMIN", "MOD"]), getAllReport);
module.exports = router;
