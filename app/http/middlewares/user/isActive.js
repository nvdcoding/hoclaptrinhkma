const User = require("../../../models/User");
module.exports = {
  isActive: async (req, res, next) => {
    const userMail = req.body.email;
    const check = await User.findOne({ email: userMail }).exec();
    if (!check) {
      return res.json({
        status: 401,
        message: "User not found",
      });
    }
    if (check.status === "disabled") {
      return res.json({
        status: 401,
        message: "Account is disabled",
      });
    }
    return next();
  },
};
