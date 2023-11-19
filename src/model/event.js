module.exports = (sequelize, Sequelize) => {
  return sequelize.define("event", {
    name: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    creator: {
      type: Sequelize.STRING,
    },
  });
};
