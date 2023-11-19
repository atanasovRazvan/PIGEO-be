module.exports = (sequelize, Sequelize) => {
  return sequelize.define("userActivity", {
    userEmail: {
      type: Sequelize.STRING,
    },
    activityId: {
      type: Sequelize.STRING,
    },
    role: {
      type: Sequelize.STRING,
    },
  });
};
