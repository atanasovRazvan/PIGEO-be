const express = require("express");
const TodoController = require("../controllers/TodoController");
const todoRouter = express.Router();

// Request body: { title, description, asignee, activityId }
// Response if successful:
//     - Status: 200
todoRouter.post("/activity", TodoController.createActivityTodo);

// Request body: { title, description, asignee, eventId }
// Response if successful:
//     - Status: 200
todoRouter.post("/event", TodoController.createEventTodo);

// Request body: { todoId, status, type }, where type is one of "EVENT" | "ACTIVITY"
// Response if successful:
//     - Status: 200
todoRouter.patch("/", TodoController.updateStatus);

module.exports = todoRouter;
