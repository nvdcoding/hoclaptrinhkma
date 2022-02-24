const User = require("../../../models/User");
module.exports = {
  checkUser: async (req, res, next) => {
    const id = req.params.userId;
    req.jwtDecoded;
    if (id !== req.jwtDecoded.id) {
      return res.json({
        message: "Not user",
      });
    }
    return next();
  },
};
