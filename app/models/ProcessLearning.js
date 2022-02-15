const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserLesson = new Schema({
  user: { type: String, require: true },
  process: [],
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
 *  {courseId, process: [id cac bai da hoc] }
 * ]
 *
 * }
 * }
 * }
 *
 */
