const config = {
    port: process.env.PORT || 4400,
    jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
    mongoUri: "mongodb+srv://krsto:kikimiki@cluster0.jeudp.mongodb.net/eventMenager?retryWrites=true&w=majority"
}

export default config;