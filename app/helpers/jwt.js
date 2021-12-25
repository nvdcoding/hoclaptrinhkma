const jwt = require("jsonwebtoken");
const generate = async (payload, secretSignature, tokenLife) => {
  const token = await jwt.sign(payload, secretSignature, {
    algorithm: "HS256",
    expiresIn: tokenLife,
  });
  return token;
};
const verify = async (token, key) => {
  try {
    const payload = await jwt.verify(token, key, {
      algorithm: "HS256",
    });
    return payload;
  } catch (error) {
    return false;
  }
};
module.exports = {
  generate,
  verify,
};
