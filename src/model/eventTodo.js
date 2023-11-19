module.exports = (sequelize, Sequelize) => {
  return sequelize.define("eventTodo", {
    title: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    asignee: {
      type: Sequelize.STRING,
    },
    eventId: {
      type: Sequelize.STRING,
    },
    status: {
      type: Sequelize.STRING,
    },
  });
};
