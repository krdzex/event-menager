const authenticate = (jwt, cb) => {
    if (typeof window !== "undefined") {
        sessionStorage.setItem("jwt", JSON.stringify(jwt));
        cb()
    }
}
const isAuthentcated = () => {
    if (typeof window == "undefined") return false;
    if (sessionStorage.getItem("jwt")) {
        return JSON.parse(sessionStorage.getItem("jwt"))
    }
    return false;
}

const signOut = () => {
    if (typeof window !== "undefined") {
        sessionStorage.removeItem("jwt")
    }
}

export default { authenticate, isAuthentcated, signOut }