import url from "../config/config.js"
const headers = { "Accept": "application/json", "Content-Type": "application/json" };

const createUser = (user) => {
    console.log(user)
    return fetch(`${url}/register`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(user)
    }).then(response => response.json()).catch(err => console.log(err))
}

const userInfo = (id) => {
    return fetch(`${url}/users/${id}`, {
        method: "GET",
        headers: headers,
    }).then(response => response.json()).catch(err => console.log(err))
}


export { createUser, userInfo }