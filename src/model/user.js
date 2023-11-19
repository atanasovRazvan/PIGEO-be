module.exports = (sequelize, Sequelize) => {
  return sequelize.define("user", {
    email: {
      type: Sequelize.STRING,
    },
  });
};
