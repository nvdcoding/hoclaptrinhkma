const express = require("express");
const router = express.Router();
const { isAuth, hasRoles } = require("../http/middlewares/auth");
const {
  updateUser,
  setUserStatus,
  setUserRole,
  setModCourse,
  deleteUser,
  changePassword,
  addCourse,
  storePost,
} = require("../http/controllers/user");

/* By USER*/
router.post("/password", isAuth, changePassword);
router.put("/", isAuth, updateUser);
router.put("/course", isAuth, addCourse);
router.put("/store", isAuth, storePost);
/* By ADMIN */
router.put("/status/:id", hasRoles(["ADMIN"]), setUserStatus);
router.put("/role/:id", hasRoles(["ADMIN"]), setUserRole);
router.put("/mod/:id", hasRoles(["ADMIN"]), setModCourse);
router.delete("/:id", hasRoles(["ADMIN"]), deleteUser);

module.exports = router;
