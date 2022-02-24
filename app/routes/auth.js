const express = require("express");
const { isActive } = require("../http/middlewares/user/isActive");
const router = express.Router();
const {
  signUp,
  signIn,
  logout,
  refreshToken,
  activeAccount,
  forgetPassword,
  resetPassword,
} = require("../http/controllers/auth");

router.post("/sign-up", signUp);
router.post("/sign-in", isActive, signIn);
router.get("/active/:id", activeAccount);
router.delete("/logout", logout);
router.post("/refresh-token", refreshToken);
router.post("/forgot", forgetPassword);
router.put("/forgot/:token", resetPassword);
// router.get('/me', authController.signUp);

module.exports = router;
