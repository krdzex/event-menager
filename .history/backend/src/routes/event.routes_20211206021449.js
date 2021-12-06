import express from "express";
import eventController from "../controller/event.controller";
import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "../frontend/public/images");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname)
    }
})
const upload = multer({ storage: storage })


const router = express.Router()


router.route("/dashboard").get(eventController.listEvents)
router.route("/dashboard/:categorie").get(eventController.listEventsByCategorie)
router.route("/user/dashboard/:userId").get(eventController.listEventsByUser)
router.route("/event").post(upload.single('img'), eventController.createEvent)
router.route("/event/:eventId").delete( eventController.removeEvent)
router.route("/registration/:eventId").put( eventController.makeRequest)
router.route("/registration/decision/:eventId").put( eventController.makeDecision)

export default router;