import url from "../config/config.js"
const headers = { "Accept": "application/json", "Content-Type": "application/json" };


const createEvent = (event) => {
    return fetch(`${url}/event`, {
        method: "POST",
        body: event
    }).then(response => response.json()).catch(err => console.log(err))
}

const listEvents = () => {
    return fetch(`${url}/dashboard`, {
        method: "GET",
        headers: headers
    }).then(response => response.json()).catch(err => console.log(err))
}

const listEventsByCategorie = (categorie) => {
    return fetch(`${url}/dashboard/${categorie}`, {
        method: "GET",
        headers: headers
    }).then(response => response.json()).catch(err => console.log(err))
}

const listEventsByUser = (user) => {
    return fetch(`${url}/user/dashboard/${user}`, {
        method: "GET",
        headers: headers
    }).then(response => response.json()).catch(err => console.log(err))
}

const deleteEvent = (event) => {
    return fetch(`${url}/event/${event}`, {
        method: "DELETE",
        headers: headers
    }).then(response => response.json()).catch(err => console.log(err))
}

const sendRequest = (eventId, data) => {
    return fetch(`${url}/registration/${eventId}`, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(data)
    }).then(response => response.json()).catch(err => console.log(err))
}

const listRequests = (eventId, data) => {
    return fetch(`${url}/registration`, {
        method: "GET",
        headers: headers,
    }).then(response => response.json()).catch(err => console.log(err))
}

const makeDecision = (eventId, data) => {
    return fetch(`${url}/registration/decision/${eventId}`, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(data)
    }).then(response => response.json()).catch(err => console.log(err))
}





export { makeDecision,listEvents, createEvent, listEventsByCategorie, listEventsByUser, deleteEvent, sendRequest, listRequests }