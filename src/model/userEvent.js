module.exports = (sequelize, Sequelize) => {
  return sequelize.define("userEvent", {
    userEmail: {
      type: Sequelize.STRING,
    },
    eventId: {
      type: Sequelize.STRING,
    },
    role: {
      type: Sequelize.STRING,
    },
  });
};
