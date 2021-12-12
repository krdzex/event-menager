
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

