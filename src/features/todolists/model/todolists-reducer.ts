import {v1} from "uuid";
import {FilterValuesType, TodolistType} from "../../../app/App";
const initialState: TodolistType[] = []

export const todolistsReducer = (state:TodolistType[] = initialState, action: ActionsType): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(el => el.id !== action.payload.id)
        }
        case 'ADD-TODOLIST': {
            const todolistTitle = action.payload.title
            const newTodolist: TodolistType = {id: action.payload.id, title: todolistTitle, filter: 'all'}
            return [newTodolist, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todolistId = action.payload.id
            const todolistTitle = action.payload.title

            return state.map(el => el.id === todolistId ? {...el, title: todolistTitle} : el)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolistId = action.payload.id
            const todolistFilter = action.payload.filter

            return state.map(el => el.id === todolistId ? {...el, filter: todolistFilter} : el)
        }

        default:
            return state
    }
}

export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>

type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistFilterActionType
    | ChangeTodolistTitleActionType

export const removeTodolistAC = (id: string) => {
    return {type: 'REMOVE-TODOLIST', payload: {id}} as const
}

export const addTodolistAC = (title: string) => {
    return {type: 'ADD-TODOLIST', payload: {title, id: v1()}} as const
}

export const changeTodolistTitleAC = (payload: {id: string, title: string}) => {
    return {type: 'CHANGE-TODOLIST-TITLE', payload} as const
}

export const changeTodolistFilterAC = (payload: {id: string, filter: FilterValuesType}) => {
    return {type: 'CHANGE-TODOLIST-FILTER', payload} as const
}




