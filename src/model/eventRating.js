module.exports = (sequelize, Sequelize) => {
    return sequelize.define("eventRating", {
        score: {
            type: Sequelize.STRING,
        },
        eventId: {
            type: Sequelize.STRING,
        },
        userEmail: {
            type: Sequelize.STRING,
        }
    });
};
