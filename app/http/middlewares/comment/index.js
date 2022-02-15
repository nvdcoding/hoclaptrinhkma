const Comment = require("../../../models/Comment");
module.exports = {
  checkCommentOwner: async (req, res, next) => {
    const commentId = req.params.id;
    const comment = await Comment.findOne({ _id: commentId }).exec();
    if (req.jwtDecoded.id !== comment.author) {
      return res.status(400).json({
        status: 400,
        message: "Not Comment's Owner",
      });
    }
    return next();
  },
  checkCommentDelete: async (req, res, next) => {
    const commentId = req.params.id;
    const comment = await Comment.findOne({ _id: commentId }).exec();
    if (!comment) {
      return res.status(400).json({
        status: 400,
        message: "Comment not found",
      });
    }
    if (
      req.jwtDecoded.id !== comment.author &&
      req.jwtDecoded.roles !== "ADMIN" &&
      req.jwtDecoded.roles !== "MOD"
    ) {
      return res.status(400).json({
        status: 400,
        message: "Not Permisson",
      });
    }
    return next();
  },
};
