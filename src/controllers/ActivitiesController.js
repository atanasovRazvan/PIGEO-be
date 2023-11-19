const db = require("../model");
const { ACCESS_ROLES } = require("../utils/constants");
const Activities = db.activity;
const UserActivities = db.userActivity;


const createActivity = async (req, res) => {
  const { name, description, requesterEmail, eventId } = req.body;
  const newActivity = await Activities.create({
    name, description, eventId
  });
  await UserActivities.create({
    userEmail: requesterEmail,
    activityId: newActivity.id,
    role: ACCESS_ROLES.ACTIVITY_ADMIN,
  });

  res.sendStatus(200);
};

const joinActivity = async (req, res) => {
  const { userEmail, activityId } = req.body;

  const userAlreadyJoined = !!(await UserActivities.findOne({
    where: {
      activityId,
      userEmail,
    },
    raw: true,
  }));
  if(userAlreadyJoined) {
    res.sendStatus(302);
    res.send({ message: "User already joined!" });
  }
  else {
    await UserActivities.create({
      userEmail,
      activityId,
      role: ACCESS_ROLES.PARTICIPANT
    });
    res.sendStatus(200);
  }
}

module.exports = {
  createActivity,
  joinActivity
};