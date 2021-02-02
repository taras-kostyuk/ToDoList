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

export type TasksStateType = {
    [key: string]: Array<TaskType>
}
export type FilterValueType = "all" | "active" | "completed"

export type TodoListType = {
    id: string
    title: string
    filter: FilterValueType
}


function AppWithReducers() {
    let todoListId1 = v1()
    let todoListId2 = v1()

    let [todoLists, dispatchToTodolistReducer] = useReducer(todolistsReducer,[
        {id: todoListId1, title: "What to learn", filter: "all"},
        {id: todoListId2, title: "What to by", filter: "all"}
    ])

    let [tasksObj, dispatchToTaskReducer] = useReducer(tasksReducer,{
        [todoListId1]: [
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Rest api", isDone: false},
            {id: v1(), title: "graphQL", isDone: false}
        ],
        [todoListId2]: [
            {id: v1(), title: "Book", isDone: true},
            {id: v1(), title: "Milk", isDone: true}
        ]
    })
    function removeTask(id: string, todoListId: string) {
        const action = removeTaskAC(id,todoListId)
        dispatchToTaskReducer(action)
    }

    function addTask(title: string, todoListId: string) {
        const action = addTaskAC(title,todoListId)
        dispatchToTaskReducer(action)
    }

    function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
        const action = changeTaskStatusAC(taskId,isDone,todoListId)
        dispatchToTaskReducer(action)
    }

    function changeTaskTitle(taskId: string, newTitle: string, todoListId: string) {
        const action = changeTaskTitleAC(taskId,newTitle,todoListId)
        dispatchToTaskReducer(action)
    }

    function changeTodoListTitle(id: string, newTitle: string) {
const action = changeTodolistTitleAC(id,newTitle)
        dispatchToTodolistReducer(action)
    }


    function changeFilter(title: FilterValueType, todoListId: string) {
        dispatchToTodolistReducer(changeTodolistFilterAC(title,todoListId))
    }


    let removeTodoList = (todoListId: string) => {
        const action = removeTodolistAC(todoListId)
        dispatchToTodolistReducer(action)
        dispatchToTaskReducer(action)

    }

    function addTodoList(title: string) {

        const action = addTodolistAC(title)
        dispatchToTodolistReducer(action)
        dispatchToTaskReducer(action)
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

export default AppWithReducers;
