import {combineReducers, createStore} from "redux";
import {todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reduser";
import {TodoListType} from "../AppWithRedux";
import {TasksStateType} from "../AppWithRedux";

/* const rootReducer = combineReducers({
     todoLists: todolistsReducer,
     tasks: tasksReducer
 })*/
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})
export type AppRootState = ReturnType<typeof rootReducer>
/*type AppRootState = {
     todoLists: Array<TodoListType>
    tasks: TasksStateType
}*/
export const store = createStore(rootReducer)


// @ts-ignore
window.store = store

