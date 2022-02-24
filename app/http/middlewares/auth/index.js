const User = require("../../../models/User");
const jwtHelper = require("../../../helpers/jwt");
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
  hasRoles: (rolesArr) => {
    return async (req, res, next) => {
      const tokenClient = req.headers["authorization"] || req.body.token;
      if (tokenClient) {
        let flag = false;
        try {
          const decoded = await jwtHelper.verify(
            tokenClient.replace(/^Bearer\s/, ""),
            process.env.ACCESS_TOKEN_SECRET
          );
          for (let i = 0; i < rolesArr.length; i++) {
            if (decoded.roles === rolesArr[i]) {
              flag = true;
              break;
            }
          }
          if (flag) {
            req.jwtDecoded = decoded;
            return next();
          } else {
            return res.json({
              status: 401,
              message: "Dont have permission",
            });
          }
        } catch (error) {
          return res.json({
            status: 403,
            message: "Unauthorized",
          });
        }
      } else {
        return res.json({
          message: "No token provided",
        });
      }
    };
  },
  checkMod: async (req, res, next) => {
    let flag = false;
    if (req.jwtDecoded.roles !== "MOD") {
      return next();
    } else {
      const check = await User.findOne({ _id: req.jwtDecoded.id }).exec();
      for (let i = 0; i < check.manage.length; i++) {
        if (req.params.id === check.manage[i]) {
          flag = true;
          break;
        }
      }
      if (!flag) {
        return res.json({
          status: 401,
          message: "Unauthorized",
        });
      } else {
        return next();
      }
    }
  },
};
