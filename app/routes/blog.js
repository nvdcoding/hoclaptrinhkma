const express = require("express");
const router = express.Router();
const { hasRoles, isAuth } = require("../http/middlewares/auth/index");
const { checkBlogOwner, checkBlogDelete } = require("../http/middlewares/blog");
const {
  createBlog,
  updateBlog,
  deleteBlog,
  getAllBlog,
  getOneBlog,
  getBlogQueue,
  changeStatusBlog,
  getTopic,
  getOneBlogInQueue,
} = require("../http/controllers/blog");
router.get("/", getAllBlog); //
router.get("/:blogId", getOneBlog); //
router.get("/topic/:topic", getTopic); //

router.get("/queue/manage", hasRoles(["ADMIN", "MOD"]), getBlogQueue); //
router.get("/queue/manage/:id", hasRoles(["ADMIN", "MOD"]), getOneBlogInQueue); //
router.put("/queue/:id", hasRoles(["ADMIN", "MOD"]), changeStatusBlog); //

router.post("/", isAuth, createBlog); //
router.put("/:id", isAuth, checkBlogOwner, updateBlog); //
router.delete("/:id", isAuth, checkBlogDelete, deleteBlog); //

module.exports = router;
