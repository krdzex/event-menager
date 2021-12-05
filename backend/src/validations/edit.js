import Validator from "validator";
import isEmpty from "is-empty";

module.exports = function validateEdit(data) {
    let errors = {}

    data.userName = !isEmpty(data.userName) ? data.userName : ""
    data.email = !isEmpty(data.email) ? data.email : ""

    if (Validator.isEmpty(data.userName)) {
        errors.userName = "Username is required";
    }
    if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }

}