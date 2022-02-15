const axios = require("axios");
const axiosPost = async (url, data) => {
  // create a promise for the axios request
  const res = await axios.post(url, data);
  return res.data;
};
module.exports = { axiosPost };
