import React, {useCallback} from "react";
import {FilterValueType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditTableSpan} from "./EditTableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task";

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    changeFilter: (value: FilterValueType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todoListId: string) => void
    filter: FilterValueType
    removeTodoList: (todoListId: string) => void
    changeTodoListTitle: (id: string, newTitle: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    removeTask: (tasksId: string, todoListId: string) => void

}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const TodoList = React.memo( function (props: PropsType)  {


    const onAllClickHandler = useCallback(() => props.changeFilter("all", props.id),[props.changeFilter, props.id])
    const onActiveClickHandler = useCallback(() => props.changeFilter("active", props.id),[props.changeFilter, props.id])
    const onCompletedClickHandler = useCallback(() => props.changeFilter("completed", props.id),[props.changeFilter, props.id])
    const removeTodoList = () => {
        props.removeTodoList(props.id)
    }

    const changeTodoListTitle = useCallback( (newTitle: string) => {
        props.changeTodoListTitle(props.id, newTitle)
    },[props.id, props.changeTodoListTitle])


    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    },[props.addTask,props.id])
    let tasksForTodoList = props.tasks

    if (props.filter === "active") {
        tasksForTodoList = props.tasks.filter(t => t.isDone === false);
    }
    if (props.filter === "completed") {
        tasksForTodoList = props.tasks.filter(t => t.isDone === true)
    }
    return (

        <div className="App">
            <div>
                <h3><EditTableSpan title={props.title} onChange={changeTodoListTitle}/>

                    <IconButton  onClick={removeTodoList}>
                        <Delete />
                    </IconButton>
                </h3>
                <AddItemForm addItem={addTask}/>
                <div>
                    {
                        props.tasks.map(t => <Task
                        task={t}
                        changeTaskStatus={props.changeTaskStatus}
                        changeTaskTitle={props.changeTaskTitle}
                        removeTask={props.removeTask}
                        todoListId={props.id}
                        key={t.id}
                        />)
                    }

                </div>
                <div>
                    <Button variant={props.filter === 'all' ? "contained" : "text"}
                            onClick={onAllClickHandler}>All
                    </Button>

                    <Button color={"primary"} variant={props.filter === 'active' ? "contained" : "text"}
                            onClick={onActiveClickHandler}>Active
                    </Button>

                    <Button color={"secondary"} variant={props.filter === 'completed' ? "contained" : "text"}
                            onClick={onCompletedClickHandler}>Completed
                    </Button>

                </div>
            </div>
        </div>
    );

})

