import {v1} from "uuid";
import {TodolistType} from "../App";


let todolistId1 = v1()
let todolistId2 = v1()

const initialState: TodolistType[] = [
    {id: todolistId1, title: 'What to learn', filter: 'all'},
    {id: todolistId2, title: 'What to buy', filter: 'all'},
]

type ActionsType = {
    type: string
    payload: any
}

export const todolistReducer = (state = initialState, action: ActionsType): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(el => el.id !== action.payload.id)
        }
        case 'ADD-TODOLIST': {
            return state
        }
        default:
            return state
    }
}