const db = require("../model");
const ActivityRating = db.activityRating;
const EventRating = db.eventRating;

const rateActivity = async (req, res) => {
    const { score, activityId, userEmail } = req.body;
    await ActivityRating.create({
        score, activityId, userEmail
    });
    res.sendStatus(200);
};

const rateEvent = async (req, res) => {
    const { score, eventId, userEmail } = req.body;
    await EventRating.create({
        score, eventId, userEmail
    });
    res.sendStatus(200);
}

module.exports = {
    rateActivity,
    rateEvent
};