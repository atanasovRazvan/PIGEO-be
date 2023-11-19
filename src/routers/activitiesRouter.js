const express = require("express");
const ActivitiesController = require("../controllers/ActivitiesController");
const activitiesRouter = express.Router();

// Request body: { name, description, requesterEmail, eventId }
// Response if successful:
//     - Status: 200
activitiesRouter.post("/", ActivitiesController.createActivity);

// Request body: { userEmail, activityId }
// Response if successful:
//     - Status: 200
// Response if fail:
//     - Status: 302;
//     - Response body: { message: "User already joined!" }
activitiesRouter.post("/join", ActivitiesController.joinActivity);

module.exports = activitiesRouter;
