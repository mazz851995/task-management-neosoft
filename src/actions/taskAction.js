import axios from "axios";
import { GET_TASKS, ADD_TASK, GET_SINGLE_TASK, UPDATE_TASK } from "./actionTypes";

export const getTasks = (userID) => async (dispatch) => {
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_API}?userID=${userID}&_sort=priority&_order=asc`);
        dispatch({
            type: GET_TASKS,
            payload: data
        })

    } catch (error) {
        console.log("getTasks error", error);
    }
}

// Add Task
export const addTasks = (taskData) => async (dispatch) => {
    try {
        await axios.post(`${process.env.REACT_APP_API}`, taskData);
        dispatch({
            type: ADD_TASK
        })
        dispatch(getTasks(taskData.userID))
    } catch (error) {
        console.log("error", error);
    }
}

// Delete Task
export const deleteTask = (id, userID) => async (dispatch) => {
    try {
        await axios.delete(`${process.env.REACT_APP_API}/${id}`);
        dispatch(getTasks(userID))
    } catch (error) {
        console.log("error", error);
    }
}

// get single task
export const singleTask = (id) => async (dispatch) => {
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_API}/${id}`);
        dispatch({
            type: GET_SINGLE_TASK,
            payload: data
        })
    } catch (error) {
        console.log("error", error);
    }
}

// get single task
export const updateTask = (taskData) => async (dispatch) => {
    try {
        await axios.put(`${process.env.REACT_APP_API}/${taskData.id}`, taskData);
        dispatch({
            type: UPDATE_TASK
        })
        dispatch(getTasks(taskData.userID))
    } catch (error) {
        console.log("error", error);
    }
}

// Update Task Stage
export const updateStageTask = (taskId, stage) => async (dispatch) => {
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_API}/${taskId}`);
        data.stage = stage;
        dispatch(updateTask(data))
    } catch (error) {
        console.log("error", error);
    }
}