import express from "express";
import eventController from "../controller/event.controller";
import multer from "multer";
import cas
cache cache = require('memory-cache');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "../frontend/public/images");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname)
    }
})
const upload = multer({ storage: storage })

let memCache = new cache.Cache();
let cacheMiddleware = (duration) => {
    return (req, res, next) => {
        let key = '__express__' + req.originalUrl || req.url
        let cacheContent = memCache.get(key);
        if (cacheContent) {
            res.send(cacheContent);
            return
        } else {
            res.sendResponse = res.send
            res.send = (body) => {
                memCache.put(key, body, duration * 1000);
                res.sendResponse(body)
            }
            next()
        }
    }
}
const router = express.Router()


router.route("/dashboard").get(eventController.listEvents)
router.route("/dashboard/:categorie").get(eventController.listEventsByCategorie)
router.route("/user/dashboard/:userId").get(eventController.listEventsByUser)
router.route("/event").post(upload.single('img'), eventController.createEvent)
router.route("/event/:eventId").delete(eventController.removeEvent)
router.route("/registration/:eventId").put(eventController.makeRequest)
router.route("/registration/decision/:eventId").put(eventController.makeDecision)

export default router;