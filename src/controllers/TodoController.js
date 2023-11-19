const db = require("../model");
const {TODO_STATUS} = require("../utils/constants");
const ActivityTodo = db.activityTodo;
const EventTodo = db.eventTodo;

const createActivityTodo = async (req, res) => {
    const { title, description, asignee, activityId } = req.body;
    await ActivityTodo.create({
        title, description, asignee, activityId, status: TODO_STATUS.READY_FOR_WORK
    });
    res.sendStatus(200);
};

const createEventTodo = async (req, res) => {
    const { title, description, asignee, eventId } = req.body;
    await EventTodo.create({
        title, description, asignee, eventId, status: TODO_STATUS.READY_FOR_WORK
    });
    res.sendStatus(200);
}

const updateStatus = async (req, res) => {
    const { todoId, status, type } = req.body;
    if(type === "EVENT") {
        const eventTodo = await EventTodo.findOne({
            where: {
                id: todoId,
            },
            raw: true,
        });
        await EventTodo.update({
            status
        },{
            where: {
                ...eventTodo
            }
        });
        res.sendStatus(200);
    }
    if(type === "ACTIVITY") {
        const activityTodo = await ActivityTodo.findOne({
            where: {
                id: todoId,
            },
            raw: true,
        });
        await ActivityTodo.update({
            status
        },{
            where: {
                ...activityTodo
            }});
        res.sendStatus(200);
    }
}

module.exports = {
    createActivityTodo,
    createEventTodo,
    updateStatus
};