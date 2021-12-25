const jwtHelper = require("../../helpers/jwt");
module.exports = {
  isAdmin: async (req, res, next) => {
    const tokenClient = req.headers["authorization"] || req.body.token;
    if (tokenClient) {
      try {
        const decoded = await jwtHelper.verify(
          tokenClient.replace(/^Bearer\s/, ""),
          process.env.ACCESS_TOKEN_SECRET
        );
        if (decoded.roles !== "ADMIN") {
          return res.status(401).json({
            status: 401,
            message: "Dont have permission",
          });
        }
        req.jwtDecoded = decoded;
        next();
      } catch (error) {
        return res.status(401).json({
          status: 401,
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
