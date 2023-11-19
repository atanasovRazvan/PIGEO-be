const eventsRouter = require("./eventsRouter");
const activitiesRouter = require("./activitiesRouter");
const userRbacRouter = require("./userRbacRouter");
const ratingRouter = require ("./ratingRouter");
const todoRouter = require ("./todoRouter");

const routes = [
  {
    path: "/event",
    router: eventsRouter,
  },
  {
    path: "/activity",
    router: activitiesRouter,
  },
  {
    path: "/user",
    router: userRbacRouter,
  },
  {
    path: "/rate",
    router: ratingRouter,
  },
  {
    path: "/todo",
    router: todoRouter,
  },
];

module.exports = routes;
