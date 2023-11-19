const config = require("../configuration");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB_NAME,
  config.DB_USER,
  config.DB_PASSWORD,
  {
    host: config.DB_HOST,
    dialect: "postgres",
    operatorsAliases: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.event = require("./event.js")(sequelize, Sequelize);
db.activity = require("./activity.js")(sequelize, Sequelize);
db.user = require("./user.js")(sequelize, Sequelize);
db.userActivity = require("./userActivity.js")(sequelize, Sequelize);
db.userEvent = require("./userEvent.js")(sequelize, Sequelize);
db.activityRating = require("./activityRating.js")(sequelize, Sequelize);
db.eventRating = require("./eventRating.js")(sequelize, Sequelize);
db.eventTodo = require("./eventTodo.js")(sequelize, Sequelize);
db.activityTodo = require("./activityTodo.js")(sequelize, Sequelize);

module.exports = db;
