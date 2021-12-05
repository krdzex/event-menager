import Validator from "validator";
import isEmpty from "is-empty";

module.exports = function validateEvent(data) {
    let errors = {}
    data.img = !isEmpty(data.img) ? data.img : "";
    data.title = !isEmpty(data.title) ? data.title : ""
    data.eventDescription = !isEmpty(data.eventDescription) ? data.eventDescription : ""
    data.categorie = !isEmpty(data.categorie) ? data.categorie : ""


    if (Validator.isEmpty(data.img)) {
        errors.img = "Image is required";
    }

    if (Validator.isEmpty(data.title)) {
        errors.title = "Title is required";
    }

    if (Validator.isEmpty(data.eventDescription)) {
        errors.eventDescription = "Description is required";
    }
    if (Validator.isEmpty(data.categorie)) {
        errors.categorie = "Categorie is required";
    }

    if (data.eventPrice === null) {
        errors.eventPrice = "Price is required";
    }

    if (data.eventDate === null) {
        errors.eventDate = "Date is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}