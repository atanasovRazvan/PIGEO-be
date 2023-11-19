module.exports = (sequelize, Sequelize) => {
  return sequelize.define("activity", {
    name: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    eventId: {
      type: Sequelize.STRING,
    },
  });
};
