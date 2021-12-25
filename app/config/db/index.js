
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path: '.env'});
module.exports = {
  connect: async () => {
    try {
      await mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      console.log("Connect db");
    } catch (error) {
      console.log(error);
    }
  }
}