const appError = require("../../../helpers/error");
const Blog = require("../../../models/Blog");
const Course = require("../../../models/Course");
const Lesson = require("../../../models/Lesson");
const search = async (key) => {
  const blogs = await Blog.find(
    {
      title: {
        $regex: key,
        $options: "i",
      },
      status: "enable"
    },
    {
      title: 1,
      img: 1,
    }
  ).sort({ created_at: -1 });
  const courses = await Course.find(
    {
      name: {
        $regex: key,
        $options: "i",
      },
      deleted_at: null

    },
    { name: 1, img: 1 }
  );
  const videos = await Lesson.find(
    {
      name: {
        $regex: key,
        $options: "i",
      },
      deleted_at: null
    },
    { name: 1, link: 1 }
  )
    .populate("course", "img")
    .sort({ created_at: -1 });
  const data = {
    blogs,
    courses,
    videos,
  };
  return { data: data, status: 201, message: "search success" };
};
module.exports = {
  search,
};
