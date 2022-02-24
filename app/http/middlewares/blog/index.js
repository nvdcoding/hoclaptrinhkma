const Blog = require("../../../models/Blog");
module.exports = {
  checkBlogOwner: async (req, res, next) => {
    const blogId = req.params.id;
    const blog = await Blog.findOne({ _id: blogId }).exec();
    if (req.jwtDecoded.id !== blog.author) {
      return res.json({
        status: 400,
        message: "Not Blog's Owner",
      });
    }
    return next();
  },
  checkBlogDelete: async (req, res, next) => {
    const blogId = req.params.id;
    const blog = await Blog.findOne({ _id: blogId }).exec();
    if (!blog) {
      return res.json({
        status: 400,
        message: "Blog not found",
      });
    }
    if (
      req.jwtDecoded.id !== blog.author &&
      req.jwtDecoded.roles !== "ADMIN" &&
      req.jwtDecoded.roles !== "MOD"
    ) {
      return res.json({
        status: 400,
        message: "Not Permisson",
      });
    }
    return next();
  },
};
