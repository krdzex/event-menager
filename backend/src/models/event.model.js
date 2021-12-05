import mongoose from "mongoose"

const EventSchema = new mongoose.Schema({
    img: { type: String },
    title: {
        type: String, trim: "true"
    },
    eventDescription: {
        type: String
    },
    eventPrice: {
        type: Number,
    },
    eventDate: { type: Date },
    categorie: { type: String },
    author: { type: mongoose.Types.ObjectId },
    requests: [{whoRequest: {type: mongoose.Types.ObjectId},status: {type: String}}]
})
export default mongoose.model("Event", EventSchema)


