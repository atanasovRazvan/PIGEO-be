const db = require("../model");
const { ACCESS_ROLES } = require("../utils/constants");
const Events = db.event;
const Activities = db.activity;
const UserEvents = db.userEvent;
const UserActivities = db.userActivity;
const EventTodos = db.eventTodo;
const ActivityTodos = db.activityTodo;
const ActivityRatings = db.activityRating;
const EventRatings = db.eventRating;

const createEvent = async (req, res) => {
  console.log(req.body);
  const { name, description, creator } = req.body;
  const newEvent = await Events.create({
    name, description, creator
  });
  await UserEvents.create({
    userEmail: creator,
    eventId: newEvent.id,
    role: ACCESS_ROLES.EVENT_CREATOR,
  });

  res.sendStatus(200);
};

const getEvents = async (req, res) => {
  try {
    const { requesterEmail } = req.body;
    const userEvents = await UserEvents.findAll({
      where: {
        userEmail: requesterEmail,
      },
      raw: true,
    });
    const events = [];
    for (const userEvent of userEvents) {
      const dbActivities = await Activities.findAll({
        where: {
          eventId: userEvent.eventId,
        },
        raw: true,
      });

      const dbAttendeesOnEvent = await UserEvents.findAll({
        where: {
          eventId: userEvent.eventId,
        },
        raw: true,
      });

      const adminListOnEvent = dbAttendeesOnEvent.filter((dbAttendee) => [ACCESS_ROLES.EVENT_CREATOR, ACCESS_ROLES.EVENT_ADMIN].includes(dbAttendee.role)).map((dbAttendee) => dbAttendee.userEmail)

      const event = await Events.findOne({
        where: {
          id: userEvent.eventId,
        },
        raw: true,
      });

      const eventTodos = await EventTodos.findAll({
        where: {
          eventId: userEvent.eventId,
        },
        raw: true,
      });

      const isEventRated = !!(await EventRatings.findOne({
        where: {
          eventId: userEvent.eventId,
          userEmail: requesterEmail,
        },
        raw: true,
      }));

      for (const dbActivity of dbActivities) {

        const dbAttendeesOnActivity = await UserActivities.findAll({
          where: {
            activityId: String(dbActivity.id),
          },
          raw: true,
        });

        const adminListOnActivity = dbAttendeesOnActivity.filter((dbAttendee) => [ACCESS_ROLES.ACTIVITY_ADMIN].includes(dbAttendee.role)).map((dbAttendee) => dbAttendee.userEmail)

        const activityTodos = await ActivityTodos.findAll({
          where: {
            activityId: String(dbActivity.id),
          },
          raw: true,
        });

        const isActivityRated = !!(await ActivityRatings.findOne({
          where: {
            activityId: String(dbActivity.id),
            userEmail: requesterEmail,
          },
          raw: true,
        }));

        events.push({
          id: event.id,
          name: event.name,
          description: event.description,
          creator: event.creator,
          rated: isEventRated,
          adminList: adminListOnEvent,
          activities: dbActivities.map((dbActivity) => ({
            id: dbActivity.id,
            name: dbActivity.name,
            description: dbActivity.description,
            rated: isActivityRated,
            adminList: adminListOnActivity,
            todos: activityTodos,
            attendees: dbAttendeesOnActivity.map((dbAttendee) => dbAttendee.userEmail),
          })),
          todos: eventTodos,
          attendees: dbAttendeesOnEvent.map((dbAttendee) => dbAttendee.userEmail)
        })
      }
    }
    res.status(200).send(events);
  }
  catch(error) {
    res.sendStatus(418);
  }
};

const inviteToEvent = async (req, res) => {
  // Daca e admin / creator, poate da invite
  // Invite = userul respectiv devine PARTICIPANT
  const { requesterEmail, userEmail, eventId } = req.body;

  const requesterHasAccess = [ACCESS_ROLES.EVENT_CREATOR, ACCESS_ROLES.EVENT_ADMIN].includes((await UserEvents.findOne({
    where: {
      eventId,
      userEmail: requesterEmail,
    },
    raw: true,
  })).role);

  if(!requesterHasAccess) {
    res.sendStatus(401);
    return;
  }

  const userAlreadyInvited = !!(await UserEvents.findOne({
    where: {
      eventId,
      userEmail,
    },
    raw: true,
  }));
  if(userAlreadyInvited) {
    res.sendStatus(302);
    res.send({ message: "User already invited!" });
  }
  else {
    await UserEvents.create({
      userEmail: userEmail,
      eventId,
      role: ACCESS_ROLES.PARTICIPANT,
    });
    res.sendStatus(200);
  }
}

const getStatistics = async (req, res) => {
  const { eventId } = req.body;

  const attendeesOnEvent = await UserEvents.findAll({
    where: {
      eventId,
    },
    raw: true,
  });

  const ratingsOnEvent = await EventRatings.findAll({
    where: {
      eventId,
    },
    raw: true,
  });

  const activities = await Activities.findAll({
    where: {
      eventId,
    },
    raw: true,
  });

  const activitiesStats = [];

  for(const activity of activities) {
    const attendeesOnActivity = await UserActivities.findAll({
      where: {
        activityId: String(activity.id),
      },
      raw: true,
    });

    const ratingsOnActivity = await ActivityRatings.findAll({
      where: {
        activityId: String(activity.id),
      },
      raw: true,
    });

    activitiesStats.push({
      attendees: String(Math.round(attendeesOnActivity.length * 100 / attendeesOnEvent.length)),
      score: (ratingsOnActivity.reduce((accumulator, currentRating) => {
        return accumulator + parseInt(currentRating.score);
      }, 0) / ratingsOnActivity.length).toFixed(1),
      numberOfReviews: ratingsOnActivity.length
    })
  }

  res.status(200).send({
    attendees: attendeesOnEvent.length,
    score: (ratingsOnEvent.reduce((accumulator, currentRating) => {
      return accumulator + parseInt(currentRating.score);
    }, 0) / ratingsOnEvent.length).toFixed(1),
    numberOfReviews: ratingsOnEvent.length,
    activitiesStats
  })
}

module.exports = {
  getEvents,
  createEvent,
  inviteToEvent,
  getStatistics
};
