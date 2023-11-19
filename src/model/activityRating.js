module.exports = (sequelize, Sequelize) => {
    return sequelize.define("activityRating", {
        score: {
            type: Sequelize.STRING,
        },
        activityId: {
            type: Sequelize.STRING,
        },
        userEmail: {
            type: Sequelize.STRING,
        }
    });
};