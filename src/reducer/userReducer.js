import { GET_USERS, SIGNUP_USER, LOGIN_USER, LOGOUT } from "../actions/actionTypes"


const initialState = []

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USERS:
            const datas = JSON.parse(localStorage.getItem("users"))
            if (datas) {
                return state = JSON.parse(localStorage.getItem("users"))
            } else {
                return state;
            }
        case SIGNUP_USER:
            state = [...state, action.payload]
            localStorage.setItem("users", JSON.stringify(state));
            return state

        case LOGIN_USER:
            const user = state.find(state => state.id == action.payload)
            user.isSignedIn = true;
            localStorage.setItem("users", JSON.stringify(state));
            return state

        case LOGOUT:
            const index = state.find(state => state.isSignedIn == true)
            index.isSignedIn = false;
            localStorage.setItem("users", JSON.stringify(state));
            return state


        default:
            return state;
    }
}

export default userReducer