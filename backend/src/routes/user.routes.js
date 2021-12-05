import express from "express";
import userController from "../controller/user.controller";
const router = express.Router()


router.route("/register").post(userController.createUser)
router.route("/users/:userId").get(userController.userInfo)


export default router;