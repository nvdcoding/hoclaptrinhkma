const jwtHelper = require("../../helpers/jwt");
const User = require("../../models/User");
module.exports = {
  isAuth: async (req, res, next) => {
    const tokenClient = req.headers["authorization"] || req.body.token;
    if (tokenClient) {
      try {
        const decoded = await jwtHelper.verify(
          tokenClient.replace(/^Bearer\s/, ""),
          process.env.ACCESS_TOKEN_SECRET
        );
        const check = await User.findOne({ email: decoded.email }).exec();
        if (!check) {
          return res.status(401).json({
            message: "Unauthorized",
          });
        }
        req.jwtDecoded = decoded;
        next();
      } catch (error) {
        return res.status(401).json({
          message: "Unauthorized",
        });
      }
    } else {
      return res.status(403).json({
        message: "No token provided",
      });
    }
  },
};
