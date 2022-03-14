import React, { useEffect, useState } from 'react'
import { toast } from "react-toastify"
import { useDispatch, useSelector } from 'react-redux';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { addTasks, updateTask } from '../actions/taskAction';


const Task = ({ getSingleTask, user }) => {
    const dispatch = useDispatch();

    const initialFormData = { id: Date.now().toString(), taskname: "", stage: 0, priority: "", deadline: "", userID: "" }
    const [taskData, settaskData] = useState(initialFormData);

    const [isEdit, setisEdit] = useState(false)

    const allTasks = useSelector(state => state.taskReducer.tasks);

    const resetForm = () => {
        settaskData(initialFormData)
        setisEdit(false)
    }
    const handleChange = (e) => {
        let { name, value } = e.target;
        settaskData({ ...taskData, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const { taskname, stage, priority, deadline } = taskData;

        if (!taskname || !deadline || !priority) return toast.warning("Please fill all the details");

        if (isEdit) {
            if (stage == "") return toast.warning("Please select stage");
            var taskExist = allTasks.find(task => task.id != parseInt(taskData.id) && task.taskname == taskData.taskname);
            if (taskExist != undefined) return toast.error("Task already exist..!!");
            taskData.deadline = new Date(taskData.deadline).toISOString().split('T')[0];
            dispatch(updateTask(taskData))
            toast.success("Task updated successfully..!!");
        } else {
            const taskExist = allTasks.find(task => task.taskname == taskname);
            if (taskExist != undefined) return toast.error("Task already exist..!!");
            taskData.userID = user.id
            taskData.deadline = new Date(taskData.deadline).toISOString().split('T')[0];
            dispatch(addTasks(taskData))
            toast.success("Task Added successfully..!!");
        }
        resetForm()
    }
    useEffect(() => {
        if (getSingleTask && Object.keys(getSingleTask).length > 0) {

            const { id, taskname, stage, priority, deadline, userID } = getSingleTask
            settaskData({ id, taskname, stage, priority, deadline: new Date(deadline), userID })
            setisEdit(true)
        }
    }, [getSingleTask])


    return (
        <div className='form'>
            <h4 className='text-center'>{isEdit ? "Update" : "Add new"} task</h4>
            <form className="row g-3" onSubmit={handleSubmit}>
                <div className="col-md-3 col-sm-6">
                    <label className="form-label">Taskname</label>
                    <input
                        onChange={handleChange}
                        value={taskData.taskname} type="text" name="taskname" className="form-control" placeholder="Enter task name" />
                </div>
                <div className="col-md-3 col-sm-6">
                    <label className="form-label">Task Stage</label>
                    <select disabled={isEdit ? false : true} value={taskData.stage} className='form-control' name="stage" onChange={handleChange} >
                        <option value="">--Select Stage--</option>
                        <option value="0">Backlog Stage</option>
                        <option value="1">Todo Stage</option>
                        <option value="2">Ongoing Stage</option>
                        <option value="3">Done Stage</option>
                    </select>
                </div>
                <div className="col-md-3 col-sm-6">
                    <label className="form-label">Priority</label>
                    <select value={taskData.priority} className='form-control' name="priority" onChange={handleChange} >
                        <option value="">--Select Priority--</option>
                        <option value="0">High</option>
                        <option value="1">Medium</option>
                        <option value="2">Low</option>
                    </select>
                </div>
                <div className="col-md-3 col-sm-6">
                    <label className="form-label">Task Deadline</label>
                    <DatePicker required={true} placeholderText="Choose task deadline" dateFormat="yyyy-MM-dd" showYearDropdown={true} showMonthDropdown={true} minDate={Date.now()} className="form-control" selected={taskData.deadline} onChange={(data) => settaskData({ ...taskData, deadline: data })} />
                </div>
                <div className="col-12">
                    <button type="submit" className="btn btn-primary">{isEdit ? "Update" : "Add"} Task</button>
                    <button type="button" onClick={resetForm} className="btn btn-info ms-2"> Reset</button>
                </div>
            </form>
        </div>
    )
}

export default Task
