import React, { useRef } from 'react'
import { useDispatch } from 'react-redux';
import { toast } from "react-toastify"
import { deleteTask, singleTask, updateStageTask } from '../actions/taskAction';
import { Draggable } from 'react-beautiful-dnd';
import { confirm } from "react-confirm-box";

const Lists = ({ showDelete, refs, task, index }) => {
    const options = {
        labels: {
            confirmable: "Ok",
            cancellable: "Cancel"
        }
    }

    const dispatch = useDispatch()
    const handleDelete = async (id, userId) => {
        const result = await confirm("Are you sure?", options);
        if (result) {
            dispatch(deleteTask(id, userId))
            toast.success("Task deleted successfuly");
            return;
        }
    }

    const handleEdit = (taskId) => {
        dispatch(singleTask(taskId))
    }

    const updateStage = (taskId, stage, action) => {
        var stage;
        if (action == "increase") {
            stage = parseInt(stage) + 1;
        } else {
            stage = parseInt(stage) - 1
        }
        dispatch(updateStageTask(taskId, stage))
    }
    var stage;
    if (task.stage == 0) stage = "Backlog";
    else if (task.stage == 1) stage = "Todo stage";
    else if (task.stage == 2) stage = "Ongoing stage";
    else stage = "Done";

    var priority;
    if (task.priority == 0) priority = "High";
    else if (task.priority == 1) priority = "Medium";
    else priority = "Low";

    var bg_col;
    if (task.stage == 3) bg_col = "bg-green";
    else if (task.stage == 0) bg_col = "bg-red";
    else bg_col = "";
    return (
        <Draggable key={task.id} draggableId={task.id} index={index}>
            {

                (provided) => (

                    <div index={index} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className={`mainBox ${bg_col}  `}>
                        <div ref={refs} className="box">
                            <p><b>Task Name </b> : {task.taskname}</p>
                            <p><b>Stage</b> : {stage}</p>
                            <p><b>Priority</b> : {priority}</p>
                            <p><b>Deadline</b> : {task.deadline}</p>

                            <div className="actions">
                                <div className="btn-group btn-group-sm" role="group" aria-label="Basic mixed styles example">
                                    <button onClick={() => updateStage(task.id, task.stage, "decrease")} title="Stage" disabled={task.stage == 0 ? true : false} type="button" className="btn btn-info"><i className="bi bi-arrow-left"></i></button>

                                    <button onClick={() => updateStage(task.id, task.stage, "increase")} disabled={task.stage == 3 ? true : false} type="button" className="btn btn-warning"><i className="bi bi-arrow-right"></i></button>

                                    <button onClick={() => handleEdit(task.id)} type="button" className="btn btn-success"><i className="bi bi-pencil-square"></i></button>
                                    <button onClick={() => handleDelete(task.id, task.userID)} type="button" className="btn btn-danger"><i className="bi bi-trash"></i></button>
                                </div>
                            </div>

                        </div>
                    </div>
                )
            }
        </Draggable>
    )
}

export default Lists
