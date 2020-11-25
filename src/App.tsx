import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {v1} from "uuid";
import {Simulate} from "react-dom/test-utils";
import {AddItemForm} from "./AddItemForm";


export type FilterValueType = "all" | "active" | "completed"

type TodoListType = {
    id: string
    title: string
    filter: FilterValueType
}


function App() {


    function removeTask(id: string, todoListId: string) {
        let tasks = tasksObj[todoListId];

        let filteredTasks = tasks.filter(t => t.id !== id);
        tasksObj[todoListId] = filteredTasks;
        setTasks({...tasksObj})
    }

    function addTask(title: string, todoListId: string) {
        let task = {
            id: v1(), title: title, isDone: false
        }
        let tasks = tasksObj[todoListId]
        let newTasks = [task, ...tasks];
        tasksObj[todoListId] = newTasks;
        setTasks({...tasksObj})
    }

    function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
        //достаем нужний масив по TodoListId
        let tasks = tasksObj[todoListId]
        //найтем нужную таску
        let task = tasks.find(t => t.id === taskId);
        // изсеним таску если она нашлась
        if (task) {
            task.isDone = isDone;
            // засетаем  стейт копию обєкта чтобы реакт отреагировал перерисовкой
            setTasks({...tasksObj});
        }


    }

    function changeTaskTitle(taskId: string, newTitle: string, todoListId: string) {
        let tasks = tasksObj[todoListId]
        let task = tasks.find(t => t.id === taskId);
        if (task) {
            task.title = newTitle;

            setTasks({...tasksObj});
        }


    }

    function changeTodoListTitle(id: string, newTitle: string) {

        const todoList = todoLists.find(tl => tl.id === id)
        if (todoList) {
            todoList.title = newTitle
            setTodoLists([...todoLists])
        }
    }


    function changeFilter(value: FilterValueType, todoListId: string) {
        let todoList = todoLists.find(tl => tl.id === todoListId)
        if (todoList) {
            todoList.filter = value
            setTodoLists([...todoLists])
        }
    }

    let todoListId1 = v1()
    let todoListId2 = v1()


    let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListId1, title: "What to learn", filter: "all"},
        {id: todoListId2, title: "What to by", filter: "all"}
    ])

    let removeTodoList = (todoListId: string) => {
        let filteredTodoList = todoLists.filter(tl => tl.id !== todoListId)
        setTodoLists(filteredTodoList)
        delete tasksObj[todoListId]
        setTasks({...tasksObj})
    }


    type TaskStateType = {
        [key: string]: Array<TaskType>
    }

    let [tasksObj, setTasks] = useState<TaskStateType>({
        [todoListId1]: [
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Rest api", isDone: false},
            {id: v1(), title: "graphQL", isDone: false}],
        [todoListId2]: [
            {id: v1(), title: "Book", isDone: true},
            {id: v1(), title: "Milk", isDone: true},
        ]
    })

    function addTodoList(title: string) {

        let todoList: TodoListType = {
            id: v1(),
            filter: "all",
            title: title
        }

        setTodoLists([todoList, ...todoLists])
        setTasks({
            ...tasksObj,
            [todoList.id]: []

        })
    }

    // (title:string)=>{alert(title)}
    return (


        <div className="App">
            <AddItemForm addItem={addTodoList}/>
            {
                todoLists.map((tl) => {

                    let tasksForTodoList = tasksObj[tl.id]
                    if (tl.filter === "active") {
                        tasksForTodoList = tasksForTodoList.filter(t => t.isDone === false);
                    }
                    if (tl.filter === "completed") {
                        tasksForTodoList = tasksForTodoList.filter(t => t.isDone === true)
                    }

                    return <TodoList
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
                })}


        </div>
    );
}

export default App;
