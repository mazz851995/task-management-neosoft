import { GET_TASKS, ADD_TASK, GET_SINGLE_TASK, UPDATE_TASK } from "../actions/actionTypes";
const initialState = {
    tasks: [],
    singleTask: {}
}

const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_TASKS:
            return {
                ...state,
                tasks: action.payload
            };
        case ADD_TASK:
            return { ...state }
        case GET_SINGLE_TASK:
            return {
                ...state,
                singleTask: action.payload
            }
        case UPDATE_TASK:
            return {
                ...state, singleTask: {}
            }
        default:
            return state;
    }
}

export default taskReducer