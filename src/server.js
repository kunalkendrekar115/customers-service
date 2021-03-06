const db = require("./db");
const express = require("express");

const { usersRoutes } = require("./app/routes");
const { logger, errorHandler } = require("restaurants-utils");

db.connectToDatabase();

const app = express();

const swaggerUi = require("swagger-ui-express");
const fs = require("fs");
const jsyaml = require("js-yaml");
const spec = fs.readFileSync("api.yaml", "utf8");
const swaggerDocument = jsyaml.load(spec);

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/users", usersRoutes);

app.use(errorHandler);

app.listen(3000, () => logger.info("Running Users API Service"));
