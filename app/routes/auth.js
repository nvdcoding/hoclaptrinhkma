const express = require("express");
const router = express.Router();
const { signUp, signIn, logout } = require("../http/controllers/auth");

router.post("/sign-up", signUp);
router.post("/sign-in", signIn);
router.delete("/logout", logout);
// router.get('/me', authController.signUp);

module.exports = router;
