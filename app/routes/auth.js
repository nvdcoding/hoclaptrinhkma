const express = require("express");
const { isActive } = require("../http/middlewares/user/isActive");
const router = express.Router();
const {
  signUp,
  signIn,
  logout,
  refreshToken,
} = require("../http/controllers/auth");

router.post("/sign-up", signUp);
router.post("/sign-in", isActive, signIn);
router.delete("/logout", logout);
router.post("/token", refreshToken);
// router.get('/me', authController.signUp);

module.exports = router;
