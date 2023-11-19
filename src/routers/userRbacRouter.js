const express = require("express");
const UsersRbacController = require("../controllers/UsersRbacController");
const usersRbacRouter = express.Router();

// Request body: { email: "..." }
// Response if successful:
//     - Status: 200
usersRbacRouter.post("/", UsersRbacController.login);

// Request body: { requesterEmail: "...", userEmail: "...", eventId: "..." }
// Response if successful:
//     - Status: 200
// Response if failed:
//     - Status: 401
usersRbacRouter.patch(
  "/grant-event-admin",
  UsersRbacController.grantEventAdminAccess,
);

// Request body: { requesterEmail: "...", userEmail: "...", activityId: "..." }
// Response if successful:
//     - Status: 200
// Response if failed:
//     - Status: 401
usersRbacRouter.patch(
  "/grant-activity-admin",
  UsersRbacController.grantActivityAdminAccess,
);

// Request body: { requesterEmail: "...", userEmail: "...", eventId: "..." }
// Response if successful:
//     - Status: 200
// Response if failed:
//     - Status: 401
usersRbacRouter.patch(
  "/revoke-event-admin",
  UsersRbacController.revokeEventAdminAccess,
);

// Request body: { requesterEmail: "...", userEmail: "...", activityId: "..." }
// Response if successful:
//     - Status: 200
// Response if failed:
//     - Status: 401
usersRbacRouter.patch(
  "/revoke-activity-admin",
  UsersRbacController.revokeActivityAdminAccess,
);

module.exports = usersRbacRouter;
