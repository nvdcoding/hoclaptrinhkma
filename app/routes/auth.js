const express = require("express");
const { isActive } = require("../http/middlewares/user/isActive");
const router = express.Router();
const {
  signUp,
  signIn,
  logout,
  refreshToken,
  activeAccount,
} = require("../http/controllers/auth");

router.post("/sign-up", signUp);
router.post("/sign-in", isActive, signIn);
router.get("/active/:id", activeAccount);
router.delete("/logout", logout);
router.post("/token", refreshToken);
// router.get('/me', authController.signUp);

module.exports = router;
