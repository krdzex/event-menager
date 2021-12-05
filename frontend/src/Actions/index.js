
export const logIn = () => {
    return {
        type: "LOGGED_IN"
    }
}


export const openPopUp = (content) => {
    return {
        type: "SHOW_POP_UP",
        payload: content
    }
}

export const closePopUp = () => {
    return {
        type: "REMOVE_POP_UP"
    }
}


export const openRequestPopUp = (da) => {
    return {
        type: "SHOW_REQUEST_POP_UP",
        payload: da
    }
}

export const closeRequestPopUp = () => {
    return {
        type: "CLOSE_REQUEST_POP_UP"
    }
}

export const closeRequest = (id) => {
    return {
        type: "REMOVE_REQUEST",
        id: id
    }
}

