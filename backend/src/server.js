import config from "../config/config"
import app from "./express"
import mongoose from "mongoose"
import Template from "../template"
import { Server } from "socket.io";



mongoose.Promise = global.Promise;
mongoose.connect(config.mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB connected")
}).catch(() => console.log("Error connecting on MongoDB"))

const server = app.listen(config.port, (err) => {
    if (err) {
        console.log(err)
    }
    console.log("Server started on port: " + config.port)
})
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
    }
});

io.on('connection', (socket) => {
    socket.on("join_dashboard", (data) => {
        socket.join(data)
        console.log(data + " joined dashboard!")
    })

    socket.on("send_request", data => {
        io.to(data.whoIsAuthor).emit("recive_request", { whoRequest: data.whoIsRequesting, titleOfEvent: data.eventTitle, whoIsRequestingId: data.whoIsRequestingId, eventId: data.eventId })
    })

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});


app.get("/", (req, res) => {
    res.status(200).send(Template())
})

