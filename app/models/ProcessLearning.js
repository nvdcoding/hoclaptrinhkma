const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserLesson = new Schema({
  user: { type: String, require: true }, // id user
  process: [
    {
      courseId: { type: String },
      process: [
        {
          lessonId: { type: String },
          excercise: [],
        },
      ],
    },
  ], // lo trinh hoc cua user
  created_at: {
    type: Date,
    default: Date.now(),
  },
  updated_at: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("UserLesson", UserLesson);
/**
 * {
 *  userid,
 * process: [
 *  {courseId, process: [
 *    lessonId,
 *     excercise: 0
 * ]}
 * ]
 *
 * }
 * }
 * }
 *
 */
