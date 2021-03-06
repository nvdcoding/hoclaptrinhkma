const express = require("express");
const app = express();
const db = require("./app/config/db");
const cors = require("cors");
const route = require("./app/routes");
const apiErrorHandler = require("./app/helpers/api-errors-handler");
db.connect();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
route(app);
app.use(apiErrorHandler);
app.listen(3000);
