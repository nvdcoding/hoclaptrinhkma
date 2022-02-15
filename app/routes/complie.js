const express = require("express");
const router = express.Router();
const { hasRoles, isAuth } = require("../http/middlewares/auth");
// const { checkBlogOwner, checkBlogDelete } = require("../http/middlewares/blog");
const { resolveExc } = require("../http/controllers/complie");
// router.get("/", getAllBlog); //
// router.get("/:blogId", getOneBlog); //
// router.get("/topic/:topic", getTopic); //
// router.get("/queue/manage", hasRoles(["ADMIN", "MOD"]), getBlogQueue); //
// router.put("/queue/:id", hasRoles(["ADMIN", "MOD"]), changeStatusBlog); //
router.post("/:id/:language", isAuth, resolveExc); //
// router.put("/:id", isAuth, checkBlogOwner, updateBlog); //
// router.delete("/:id", isAuth, checkBlogDelete, deleteBlog); //

module.exports = router;
