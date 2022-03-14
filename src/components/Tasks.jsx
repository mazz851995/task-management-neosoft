import React, { useRef, useState } from 'react'
import { Droppable } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';
import Lists from './Lists';


const Tasks = ({ id, stage }) => {
    const taskListRef = useRef(null);
    const allTasks = useSelector(state => state.taskReducer.tasks);


    var stageCode = "";
    if (stage == 0) stageCode = "Backlog";
    else if (stage == 1) stageCode = "Todo";
    else if (stage == 2) stageCode = "Ongoing";
    else stageCode = "Done";

    // console.log(allTasks);
    return (
        <div className="col-md-3 col-sm-6 mt-3">
            <Droppable droppableId={id}>
                {
                    (provided) => (
                        <div className="taskParentBox">
                            <h5 className='text-center'>{stageCode}</h5>
                            <div className="innerMainDiv" ref={provided.innerRef} {...provided.droppableProps}>
                                {
                                    !allTasks || allTasks.length < 1 ? <p>No Task Found</p> : (
                                        allTasks.filter(task => task.stage == stage).map((task, index) => <Lists refs={taskListRef} key={task.id} index={index} task={task} ></Lists>)
                                    )
                                }
                                {provided.placeholder}
                            </div>
                        </div>
                    )
                }
            </Droppable>
        </div>
    )
}

export default Tasks
