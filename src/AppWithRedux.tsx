import React, {useReducer} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reduser";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";

export type TasksStateType = {
    [key: string]: Array<TaskType>
}
export type FilterValueType = "all" | "active" | "completed"

export type TodoListType = {
    id: string
    title: string
    filter: FilterValueType
}


function AppWithRedux() {


    const dispatch = useDispatch()
   const todoLists = useSelector<AppRootState,Array<TodoListType>>(state => state.todoLists)
   const tasksObj = useSelector<AppRootState,TasksStateType>(state => state.tasks)



    function removeTask(id: string, todoListId: string) {
        dispatch(removeTaskAC(id,todoListId))
    }

    function addTask(title: string, todoListId: string) {
        dispatch(addTaskAC(title,todoListId))
    }

    function changeStatus(taskId: string, isDone: boolean, todoListId: string) {

        dispatch(changeTaskStatusAC(taskId,isDone,todoListId))
    }

    function changeTaskTitle(taskId: string, newTitle: string, todoListId: string) {

        dispatch(changeTaskTitleAC(taskId,newTitle,todoListId))
    }

    function changeTodoListTitle(id: string, newTitle: string) {
        dispatch(changeTodolistTitleAC(id,newTitle))
    }


    function changeFilter(title: FilterValueType, todoListId: string) {
        dispatch(changeTodolistFilterAC(title,todoListId))
    }


    let removeTodoList = (todoListId: string) => {

        dispatch(removeTodolistAC(todoListId))

    }

    function addTodoList(title: string) {

        const action = addTodolistAC(title)
        dispatch(action)
    }
    // (title:string)=>{alert(title)}
    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" arial-label="menu">
                        <Menu/>


                    </IconButton>

                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>


                </Toolbar>


            </AppBar>

            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todoLists.map((tl) => {

                            let tasksForTodoList = tasksObj[tl.id]
                            if (tl.filter === "active") {
                                tasksForTodoList = tasksForTodoList.filter(t => t.isDone === false);
                            }
                            if (tl.filter === "completed") {
                                tasksForTodoList = tasksForTodoList.filter(t => t.isDone === true)
                            }

                            return (
                                <Grid item>
                                    <Paper style={{padding:"10 px"}}>
                                        <TodoList
                                            removeTodoList={removeTodoList}
                                            key={tl.id}
                                            id={tl.id}
                                            title={tl.title}
                                            tasks={tasksForTodoList}
                                            removeTask={removeTask}
                                            changeFilter={changeFilter}
                                            addTask={addTask}
                                            changeTaskStatus={changeStatus}
                                            changeTaskTitle={changeTaskTitle}
                                            filter={tl.filter}
                                            changeTodoListTitle={changeTodoListTitle}
                                        />
                                    </Paper>
                                </Grid>
                            )
                        })}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
