const db = require("../model");
const { ACCESS_ROLES } = require("../utils/constants");
const Users = db.user;
const Events = db.event;
const UserEvent = db.userEvent;
const UserActivity = db.userActivity;
const Activities = db.activity;

const login = async (req, res) => {
  const { email } = req.body;
  const user = await Users.findOne({ where: { email }, raw: true });
  if (!user) {
    await Users.create({ email });
  }
  res.sendStatus(200);
};

const grantEventAdminAccess = async (req, res) => {
  const { requesterEmail, userEmail, eventId } = req.body;
  const event = await Events.findOne({ where: { id: eventId }, raw: true });
  const userEvent = await UserEvent.findOne({
    where: { userEmail, eventId },
    raw: true,
  });
  if (event.creator === requesterEmail) {
    await UserEvent.update({
      role: ACCESS_ROLES.EVENT_ADMIN,
    },{
      where: {
        ...userEvent
      }
    });
    res.sendStatus(200);
  } else {
    res.sendStatus(401);
  }
};

const grantActivityAdminAccess = async (req, res) => {
  const { requesterEmail, userEmail, activityId } = req.body;
  const activity = await Activities.findOne({
    where: { id: activityId },
    raw: true,
  });
  const userEventOfRequester = await UserEvent.findOne({
    where: { userEmail: requesterEmail, eventId: activity.eventId },
    raw: true,
  });
  const userActivityOfNewAdmin = await UserActivity.findOne({
    where: { userEmail, activityId },
    raw: true,
  });
  if ([ACCESS_ROLES.EVENT_ADMIN, ACCESS_ROLES.EVENT_CREATOR].includes(userEventOfRequester.role)) {
    await UserActivity.update({
      role: ACCESS_ROLES.ACTIVITY_ADMIN,
    },
        {
          where: {
            ...userActivityOfNewAdmin
          }
        }
    );
    res.sendStatus(200);
  } else {
    res.sendStatus(401);
  }
};

const revokeEventAdminAccess = async (req, res) => {
  const { requesterEmail, userEmail, eventId } = req.body;
  const event = await Events.findOne({ where: { id: eventId }, raw: true });
  const userEvent = await UserEvent.findOne({
    where: { userEmail, eventId },
    raw: true,
  });
  if (event.creator === requesterEmail) {
    await UserEvent.update({
      role: ACCESS_ROLES.PARTICIPANT,
    }, {
      where: {
        ...userEvent
      }
    }
    );
    res.sendStatus(200);
  } else {
    res.sendStatus(401);
  }
};

const revokeActivityAdminAccess = async (req, res) => {
  const { requesterEmail, userEmail, activityId } = req.body;
  const activity = await Activities.findOne({
    where: { id: activityId },
    raw: true,
  });
  const userEventOfRequester = await UserEvent.findOne({
    where: { userEmail: requesterEmail, eventId: activity.eventId },
    raw: true,
  });
  const userActivityOfNewAdmin = await UserActivity.findOne({
    where: { userEmail, activityId },
    raw: true,
  });
  if ([ACCESS_ROLES.EVENT_ADMIN, ACCESS_ROLES.EVENT_CREATOR].includes(userEventOfRequester.role)) {
    await UserActivity.update({
      role: ACCESS_ROLES.PARTICIPANT,
    },
    {
      where: {
        ...userActivityOfNewAdmin,
      }
    });
    res.sendStatus(200);
  } else {
    res.sendStatus(401);
  }
};

module.exports = {
  login,
  grantEventAdminAccess,
  grantActivityAdminAccess,
  revokeEventAdminAccess,
  revokeActivityAdminAccess,
};
