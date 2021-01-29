import {FilterValueType, TodoListType} from "../App";
import {v1} from "uuid";

type ActionType = RemoveTodoListActionType | AddTodoListActionType | ChangeTodoListActionType | ChangeTodoListFilterActionType

export type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodoListActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId:string

}
export type ChangeTodoListActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}
export type ChangeTodoListFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValueType
}

export const todolistsReducer = (state: Array<TodoListType>, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':{
            return state.filter(tl => tl.id != action.id)
        }
        case 'ADD-TODOLIST': {
            return [...state,{
                id:action.todolistId,
                title:action.title,
                filter:"all"
            }]
        }
        case "CHANGE-TODOLIST-TITLE":{
            const todoList = state.find(tl => tl.id === action.id)
            if (todoList) {
                todoList.title = action.title

            }
            return [...state]
    }
        case "CHANGE-TODOLIST-FILTER": {
            const todoList = state.find(tl => tl.id === action.id)
            if (todoList) {
                todoList.filter = action.filter

            }
            return [...state]
        }
        default:
            throw new Error("I don't understand this action type ")
    }
}

export const removeTodolistAC = (todolistId:string): RemoveTodoListActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}
export const addTodolistAC = (title:string): AddTodoListActionType => {
    return {type: 'ADD-TODOLIST', title: title, todolistId:v1()}
}
export const changeTodolistTitleAC = (id:string, title:string): ChangeTodoListActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title}
}
export const changeTodolistFilterAC = (id:string, filter:FilterValueType): ChangeTodoListFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter}
}