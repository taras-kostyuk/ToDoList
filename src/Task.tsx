import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditTableSpan} from "./EditTableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./TodoList";

export type TaskPropsType = {
    changeTaskTitle: (taskId: string, newTitle: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    removeTask: (tasksId: string, todoListId: string) => void
    task: TaskType
    todoListId: string
}
export const Task = React.memo((props: TaskPropsType) => {
    const onRemoveHandler = () => {
        props.removeTask(props.task.id, props.todoListId)
    }

    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.task.id, e.currentTarget.checked, props.todoListId)
    }
    const onChangeTitleHandler = useCallback( (newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue, props.todoListId)
    },[props.task.id,props.changeTaskTitle,props.todoListId])


    return <div key={props.task.id} className={props.task.isDone ? "is-done" : ""}>


        <Checkbox
            checked={props.task.isDone}
            onChange={onChangeStatusHandler}
        />

        < EditTableSpan title={props.task.title}
                        onChange={onChangeTitleHandler}
        />
        <IconButton onClick={onRemoveHandler}>
            <Delete/>
        </IconButton>

    </div>

})