import React, {ChangeEvent, useDebugValue} from "react";
import {FilterValueType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditTableSpan} from "./EditTableSpan";

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (tasksId: string, todoListId: string) => void
    changeFilter: (value: FilterValueType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todoListId: string) => void
    filter: FilterValueType
    removeTodoList: (todoListId: string) => void
    changeTodoListTitle: (id: string, newTitle: string) => void

}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export function TodoList(props: PropsType) {


    const onAllClickHandler = () => props.changeFilter("all", props.id)
    const onActiveClickHandler = () => props.changeFilter("active", props.id)
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id)
    const removeTodoList = () => {
        props.removeTodoList(props.id)
    }

    const changeTodoListTitle = (newTitle: string) => {
        props.changeTodoListTitle(props.id, newTitle)
    }


    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }
    return (

        <div className="App">
            <div>
                <h3><EditTableSpan title={props.title} onChange={changeTodoListTitle}/>
                    <button onClick={removeTodoList}>delete</button>
                </h3>
                <AddItemForm addItem={addTask}/>
                <ul>
                    {
                        props.tasks.map(t => {

                            const onRemoveHandler = () => {
                                props.removeTask(t.id, props.id)
                            }

                            const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
                            }
                            const onChangeTitleHandler = (newValue: string) => {
                                props.changeTaskTitle(t.id, newValue, props.id)
                            }
                            return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                                <input type="checkbox"
                                       checked={t.isDone}
                                       onChange={onChangeStatusHandler}
                                />

                                < EditTableSpan title={t.title}
                                                onChange={onChangeTitleHandler}
                                />
                                <button onClick={onRemoveHandler}> x</button>
                            </li>
                        })
                    }

                </ul>
                <div>
                    <button className={props.filter === 'all' ? "active-filter" : ""}
                            onClick={onAllClickHandler}>All
                    </button>

                    <button className={props.filter === 'active' ? "active-filter" : ""}
                            onClick={onActiveClickHandler}>Active
                    </button>

                    <button className={props.filter === 'completed' ? "active-filter" : ""}
                            onClick={onCompletedClickHandler}>Completed
                    </button>

                </div>
            </div>
        </div>
    );

}


