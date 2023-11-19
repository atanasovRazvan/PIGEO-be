const express = require("express");
const EventsController = require("../controllers/EventsController");
const eventsRouter = express.Router();

// Request body: { requesterEmail }
// Response if successful:
//     - Status: 200
//     - Response body: { events: [<array of events>] } - fisier json
// Response if fail:
//     - Status: 418
//     - Response body: { error: { <nu stiu ce vine aici> } }
eventsRouter.get("/", EventsController.getEvents);

// Request body: { name, description, creator }
// Response if successful:
//     - Status: 200
eventsRouter.post("/", EventsController.createEvent);

// Request body: { requesterEmail, userEmail, eventId }
// Response if successful:
//     - Status: 200
// #1 Response if fail - when the requester is not an admin:
//     - Status: 401
// #2 Response if fail - when the user is already invited:
//     - Status: 302
//     - Response body: { message: "User already invited!" }
eventsRouter.post("/invite", EventsController.inviteToEvent);

// Request body: { eventId }
// Response if successful:
//     - Status: 200
//     - Response body: { statistics } - fisier json
eventsRouter.get("/statistics", EventsController.getStatistics);

module.exports = eventsRouter;
