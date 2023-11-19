const express = require("express");
const RatingController = require("../controllers/RatingController");
const ratingRouter = express.Router();

// Request body: { score, eventId, userEmail }
// Response if successful:
//     - Status: 200
ratingRouter.post("/event", RatingController.rateEvent);

// Request body: { score, activityId, userEmail }
// Response if successful:
//     - Status: 200
ratingRouter.post("/activity", RatingController.rateActivity);

module.exports = ratingRouter;
