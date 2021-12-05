const requestPopUpReducer = (state = { requests: [] }, action) => {
    switch (action.type) {
        case "SHOW_REQUEST_POP_UP":
            return { ...state, requests: [...state.requests, action.payload] }
        case "REMOVE_REQUEST":
            return {
                ...state, requests: state.requests.filter(
                    (singleRequest, i) => i !== action.id
                )
            }

        case "CLOSE_REQUEST_POP_UP":
            return {
                ...state, requests: []
            }
        default:
            return state;
    }
}
export default requestPopUpReducer;