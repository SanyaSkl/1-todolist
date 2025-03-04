import { v1 } from "uuid"
import { FilterValuesType, TodolistType } from "app/App"
import { Todolist } from "../api/todolistsApi.types"

const initialState: DomainTodolist[] = []
export type DomainTodolist = Todolist & {
  filter: FilterValuesType
}

export const todolistsReducer = (state: DomainTodolist[] = initialState, action: ActionsType): (TodolistType | DomainTodolist)[] => {
  switch (action.type) {
    case "SET-TODOLISTS": {
      return action.todolists.map((tl) => ({ ...tl, filter: "all" }))
    }

    case "REMOVE-TODOLIST": {
      return state.filter((el) => el.id !== action.payload.id)
    }
    case "ADD-TODOLIST": {
      const todolistTitle = action.payload.title
      const newTodolist: TodolistType = { id: action.payload.id, title: todolistTitle, filter: "all" }
      return [newTodolist, ...state]
    }
    case "CHANGE-TODOLIST-TITLE": {
      const todolistId = action.payload.id
      const todolistTitle = action.payload.title

      return state.map((el) => (el.id === todolistId ? { ...el, title: todolistTitle } : el))
    }
    case "CHANGE-TODOLIST-FILTER": {
      const todolistId = action.payload.id
      const todolistFilter = action.payload.filter

      return state.map((el) => (el.id === todolistId ? { ...el, filter: todolistFilter } : el))
    }

    default:
      return state
  }
}

export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>

type ActionsType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistFilterActionType
  | ChangeTodolistTitleActionType
  | SetTodolistsActionType

export const setTodolistsAC = (todolists: Todolist[]) => {
  return { type: "SET-TODOLISTS", todolists } as const
}

export const removeTodolistAC = (id: string) => {
  return { type: "REMOVE-TODOLIST", payload: { id } } as const
}

export const addTodolistAC = (title: string) => {
  return { type: "ADD-TODOLIST", payload: { title, id: v1() } } as const
}

export const changeTodolistTitleAC = (payload: { id: string; title: string }) => {
  return { type: "CHANGE-TODOLIST-TITLE", payload } as const
}

export const changeTodolistFilterAC = (payload: { id: string; filter: FilterValuesType }) => {
  return { type: "CHANGE-TODOLIST-FILTER", payload } as const
}
