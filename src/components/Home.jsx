import React, { useEffect, useState, useRef } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { getTasks, updateStageTask } from '../actions/taskAction';
import Header from './Header';
import { toast } from "react-toastify"
import { confirm } from "react-confirm-box";
import Task from './Task';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { deleteTask } from '../actions/taskAction';
import Tasks from './Tasks';

const Home = () => {
    const deleteRef = useRef(null);
    // const taskListRef = useRef(null);

    const history = useHistory()
    const dispatch = useDispatch()

    const users = useSelector(state => state.userReducer)
    const signedInUser = users.find(user => user.isSignedIn == true);

    const allTasks = useSelector(state => state.taskReducer.tasks);
    const getSingleTask = useSelector(state => state.taskReducer.singleTask);

    const completedTask = allTasks.filter(task => task.stage == 3);
    const pendingTask = parseInt(allTasks.length) - parseInt(completedTask.length);

    const [showDelete, setshowDelete] = useState(false)

    const onBeforeDragStart = (res) => {
        setshowDelete(true)
    }
    const onDragEnd = async (res) => {
        if (res.destination && res.destination.droppableId != "delete-droppable" && res.destination.droppableId != res.source.droppableId) {
            var stage;
            if (res.destination.droppableId == "droppable-1") stage = 0;
            else if (res.destination.droppableId == "droppable-2") stage = 1;
            else if (res.destination.droppableId == "droppable-3") stage = 2;
            else stage = 3;

            dispatch(updateStageTask(res.draggableId, stage))
            setshowDelete(false)
            return toast.success("Task Updated successfuly");
        }

        if (res.destination && res.destination.droppableId == "delete-droppable") {
            const result = await confirm("Are you sure you want to delete?");
            if (result) {
                dispatch(deleteTask(res.draggableId, signedInUser.id));
                setshowDelete(false)
                toast.success("Task deleted successfuly");
                return;
            } else {

                setshowDelete(false)
                return false;
            }

        } else {
            setshowDelete(false)
            return false
        }
    }
    useEffect(() => {
        if (!signedInUser) {
            history.push("/");
        }
        if (signedInUser && signedInUser.id) {
            dispatch(getTasks(signedInUser.id))
        }
    }, [history])

    return (
        <div className="container">
            <Header user={signedInUser}></Header>

            <div className="status">
                <h5>Total task : {allTasks && allTasks.length > 0 ? allTasks.length : 0}</h5>
                <h5>Completed Task : {completedTask && completedTask.length > 0 ? completedTask.length : 0}</h5>
                <h5>Pending Task : {pendingTask}</h5>
            </div>

            <div className="row mt-3">
                <div className="col-md-12">
                    <Task getSingleTask={getSingleTask} user={signedInUser}></Task>
                </div>

                <div className="col-md-12">
                    <DragDropContext
                        onBeforeDragStart={onBeforeDragStart}
                        onDragEnd={onDragEnd}
                    >
                        <div className="row">
                            <Tasks id="droppable-1" stage={0} ></Tasks>
                            <Tasks id="droppable-2" stage={1} ></Tasks>
                            <Tasks id="droppable-3" stage={2} ></Tasks>
                            <Tasks id="droppable-4" stage={3} ></Tasks>
                        </div>

                        <Droppable droppableId="delete-droppable">
                            {(provided) => (
                                <div ref={provided.innerRef} {...provided.droppableProps} className={`deleteDiv ${!showDelete ? "opacity" : ""}`} >
                                    <div ref={deleteRef}><i className="bi bi-trash"></i></div>
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                </div>
            </div>
        </div>
    )
}
export default Home
