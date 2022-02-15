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
  getProfile,
  getOneUser,
  getAllUser,
  getStore,
  removeStore,
} = require("../http/controllers/user");

/* By USER*/
router.post("/password", isAuth, changePassword); //
router.put("/", isAuth, updateUser); //
router.put("/course", isAuth, addCourse); //
router.put("/store", isAuth, storePost); //
router.get("/profile", isAuth, getProfile); //
router.get("/store", isAuth, getStore); //
router.put("/store/remove", isAuth, removeStore); //
/* By ADMIN */
router.put("/status/:id", hasRoles(["ADMIN"]), setUserStatus); //
router.put("/role/:id", hasRoles(["ADMIN"]), setUserRole); //
router.put("/mod/:id", hasRoles(["ADMIN"]), setModCourse); //
router.delete("/:id", hasRoles(["ADMIN"]), deleteUser); //
router.get("/manage/", hasRoles(["ADMIN"]), getAllUser); //
router.get("/manage/:id", hasRoles(["ADMIN"]), getOneUser); //
module.exports = router;
