const express = require("express");
const cors = require("cors");
const config = require("./configuration");
const db = require("./model");
const routes = require("./routers/routes");
const bodyParser = require("body-parser");

const setup = async () => {
  await db.sequelize
    .sync()
    .then(() => {
      console.log("Synced db.");
    })
    .catch((err) => {
      console.log("Failed to sync db: " + err.message);
    });

  const app = express();

  const port = config.PORT || 3000;

  app.use(cors({ origin: "*" }));
  app.use(bodyParser.json());

  routes.forEach((route) => {
    app.use(route.path, route.router);
  });

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};

setup();
