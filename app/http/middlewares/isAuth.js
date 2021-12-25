const jwtHelper = require('../../helpers/jwt');
module.exports = {
    isAuth: async (req, res, next) => {
        const tokenClient = req.headers["x-access-token"];
        if(tokenClient) {
            try {
                const decoded = jwtHelper.verify(tokenClient, process.env.JWT_KEY);
                req.jwtDecoded = decoded;
                next();
            } catch (error) {
                return res.status(401).json({
                    message: "Unauthorized"
                });
            }
        } else {
            return res.status(403).json({
                message: "No token provided"
            });
        }
    }
}