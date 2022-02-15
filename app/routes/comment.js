const express = require("express");
const { hasRoles, checkMod, isAuth } = require("../http/middlewares/auth");
const {
  checkCommentOwner,
  checkCommentDelete,
} = require("../http/middlewares/comment");
const router = express.Router();
const {
  createComment,
  getPostComment,
  deleteComment,
  updateComment,
} = require("../http/controllers/comment");

router.post("/:post", isAuth, createComment);
router.get("/:post", getPostComment);

router.delete("/:id", isAuth, checkCommentDelete, deleteComment);
router.put("/:id", isAuth, updateComment);

module.exports = router;
