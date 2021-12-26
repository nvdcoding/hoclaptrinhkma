const express = require("express");
const router = express.Router();
const { isAuth } = require("../http/middlewares/isAuth");
const { isAdmin } = require("../http/middlewares/isAdmin");
const {
  updateUser,
  setUserStatus,
  setUserRole,
  deleteUser,
  changePassword,
} = require("../http/controllers/user");

// router.get("/", getAllCourse);
// router.get("/:slug", getOne);
/* By USER*/
router.post("/password", isAuth, changePassword);
router.put("/", isAuth, updateUser);
/* By ADMIN */
router.put("/status/:id", isAdmin, setUserStatus);
router.put("/role/:id", isAdmin, setUserRole);
router.delete("/:id", isAdmin, deleteUser);

module.exports = router;
