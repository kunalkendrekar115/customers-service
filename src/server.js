const db = require("./db");
const express = require("express");

const { usersRoutes } = require("./app/routes");
const errorHandler = require("./utils/error-handler");
const logger = require("./utils/logger");

db.connectToDatabase();

const app = express();

app.use(express.json());
app.use("/users", usersRoutes);

app.use(errorHandler);

app.listen(3000, () => logger.info("Running Users API Service"));
