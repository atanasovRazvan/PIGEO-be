module.exports = (sequelize, Sequelize) => {
    return sequelize.define("activityTodo", {
        title: {
            type: Sequelize.STRING,
        },
        description: {
            type: Sequelize.STRING,
        },
        asignee: {
            type: Sequelize.STRING,
        },
        activityId: {
            type: Sequelize.STRING,
        },
        status: {
            type: Sequelize.STRING,
        },
    });
};
