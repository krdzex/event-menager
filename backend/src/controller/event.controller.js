import Event from "../models/event.model"
import validateEvent from "../validations/event"
import fs from "fs"
import { promisify } from "util";

const listEvents = (req, res) => {
    Event.find((err, songs) => {
        res.status(200).json(songs)
    })
}

const listEventsByCategorie = (req, res) => {
    let categrie = req.params.categorie
    Event.find(({ "categorie": categrie }), (err, songs) => {
        res.status(200).json(songs)
    })
}

const listEventsByUser = (req, res) => {

    let userId = req.params.userId
    Event.find(({ "author": userId }), (err, songs) => {
        res.status(200).json(songs)
    })
}

const removeEvent = (req, res) => {
    const deleteImg = promisify(fs.unlink)
    let eventId = req.params.eventId
    Event.findByIdAndDelete(eventId).then((result) => {
        deleteImg(`../frontend/public/images/${result.img}`)
        res.status(200).json({ message: "Event deleted" })
    })
}

const createEvent = (req, res) => {
    const deleteImg = promisify(fs.unlink)
    const event = new Event(req.body);
    if (req.file !== undefined) {
        event.img = req.file.filename;
    } else {
        event.img = "";
    }
    const { errors, isValid } = validateEvent(event);

    if (!isValid) {
        if (event.img !== "") {
            deleteImg(`../frontend/public/images/${event.img}`)
        }
        return res.status(400).json(errors)
    }

    Event.findOne({ "title": req.body.title }).then((result) => {
        if (result) {
            deleteImg(`../frontend/public/images/${event.img}`)
            return res.status(400).json({ title: "Title already exist!" })
        } else {

            event.save().then(res.status(200).json({
                message: "Successfully created event"
            })).catch(err => console.log(err))
        }
    })
}

const makeRequest = async (req, res) => {
    let eventId = req.params.eventId;
    let event = await Event.findById(eventId);
    event.requests.push(req.body);
    event.save().then(res.status(200).json({
        message: "Successfully requsted."
    })).catch(err => console.log(err))
}

const makeDecision = async (req, res) => {
    let eventId = req.params.eventId;
    let event = await Event.findById(eventId);
    for (let i = 0; i < event.requests.length; i++) {
        if (event.requests[i].whoRequest.toString() === req.body.whoRequest) {
            event.requests[i].status = req.body.newStatus;
        }
    }
    event.save().then(res.status(200).json({
        message: `Successfully ${req.body.newStatus} request.`
    })).catch(err => console.log(err))
}




export default { listEvents, createEvent, listEventsByCategorie, listEventsByUser, removeEvent, makeRequest, makeDecision }