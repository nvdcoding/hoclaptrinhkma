const appError = require("../../../helpers/error");
const Comment = require("../../../models/Comment");
const Blog = require("../../../models/Blog");
const createComment = async ({ author, content, post }) => {
  const comment = await Comment.create({
    author,
    content,
    post,
    created_at: Date.now(),
    updated_at: Date.now(),
    created_by: author,
    updated_by: author,
  });
  return {
    status: 201,
    message: "create comment success",
  };
};
const getPostComment = async (postId) => {
  const post = await Blog.findById(postId).exec();
  if (!post) {
    return {
      status: 400,
      message: "Post not found",
    };
  }
  const comment = await Comment.find({
    post: post._id,
    deleted_at: null,
  }).populate("author");
  const result = comment.map((e) => {
    console.log(e);
    e.author = e.author.name ? e.author.name : "Unknown";
    e.avatar = e.author?.avatar;
    e.authorId = e.author?._id;
    return {
      authorName: e.author.name,
      authorAvatar: e.author.avatar,
      authorId: e.author._id,
      content: e.content,
      post: e.post,
      created_at: e.created_at,
      updated_at: e.updated_at,
      deleted_at: e.deleted_at,
      id: e._id,
    };
  });
  // return: [{_id, content, author}] => [{_id, content, author.name, author.avatar}]
  return {
    data: result,
    status: 200,
    message: "get list success",
  };
};
const deleteComment = async (id) => {
  const comment = await Comment.findOneAndUpdate(
    { _id: id },
    {
      deleted_at: Date.now(),
    }
  );
  return {
    status: 200,
    message: "Deleted comment",
  };
};
const updateComment = async ({ id, content }) => {
  const check = await Comment.findById(id).exec();
  if (!check) {
    return {
      status: 400,
      message: "Comment not found",
    };
  }
  const result = await Comment.findOneAndUpdate(
    { _id: id },
    {
      content,
      updated_at: Date.now(),
    }
  );
  return {
    status: 200,
    message: "update comment success",
  };
};

module.exports = {
  createComment,
  getPostComment,
  deleteComment,
  updateComment,
};
