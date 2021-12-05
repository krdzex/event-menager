import User from "../models/user.model"
import errorHandler from "../helpers/dbErrorHandler"
import validateSignUp from "../validations/registar"
import _ from "lodash"


const createUser = (req, res) => {

    const { errors, isValid } = validateSignUp(req.body);
    const user = new User(req.body);
    if (!isValid) {
        return res.status(400).json(errors)
    }
    user.save((err, result) => {
        if (err) {
            return res.status(400).json(
                errorHandler.getUniqueErrorMessage(err)
            )
        }
        res.status(200).json({
            message: "Successfully created user!"
        })
    })
}


const userInfo = (req, res) => {
    let id = req.params.userId
    User.findById(id).select("-hashed_password -created -salt").then(user => {
        res.status(200).json(user)
    })
}



export default { createUser, userInfo }