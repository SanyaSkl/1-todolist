import { Todolist } from "../api/todolistsApi.types"
import { AppDispatch } from "app/store"
import { todolistsApi } from "../api/todolistsApi"
import { RequestStatus, setAppStatusAC } from "app/app-reducer"
import { ResultCode } from "common/enums/enums"
import { handleHttpErrors } from "common/handleHttpErrors"
import { handleAppErrors } from "common/handleAppErrors"

export type FilterValuesType = "all" | "active" | "completed"

const initialState: DomainTodolist[] = []
export type DomainTodolist = Todolist & {
  filter: FilterValuesType
  entityStatus: RequestStatus
}

export const todolistsReducer = (state: DomainTodolist[] = initialState, action: ActionsType): (DomainTodolist)[] => {
  switch (action.type) {
    case "SET-TODOLISTS": {
      return action.todolists.map((tl) => ({ ...tl, filter: "all", entityStatus: "idle" }))
    }
    case "REMOVE-TODOLIST": {
      return state.filter((el) => el.id !== action.payload.id)
    }
    case "ADD-TODOLIST": {
      const newTodolist: DomainTodolist = {
        ...action.payload.todolist,
        filter: "all",
        entityStatus: "idle"
      }
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
    case "CHANGE-TODOLIST-ENTITY-STATUS": {
      const todolistId = action.payload.id
      const todolistEntityStatus = action.payload.entityStatus
      return state.map((el) => (el.id === todolistId ? { ...el, entityStatus: todolistEntityStatus } : el))
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
export type ChangeTodolistsEntityStatusActionType = ReturnType<typeof changeTodolistEntityStatusAC>

type ActionsType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistFilterActionType
  | ChangeTodolistTitleActionType
  | SetTodolistsActionType
  | ChangeTodolistsEntityStatusActionType

export const setTodolistsAC = (todolists: Todolist[]) => {
  return { type: "SET-TODOLISTS", todolists } as const
}

export const removeTodolistAC = (id: string) => {
  return { type: "REMOVE-TODOLIST", payload: { id } } as const
}

export const addTodolistAC = (payload: { todolist: DomainTodolist }) => {
  return { type: "ADD-TODOLIST", payload } as const
}

export const changeTodolistTitleAC = (payload: { id: string; title: string }) => {
  return { type: "CHANGE-TODOLIST-TITLE", payload } as const
}

export const changeTodolistFilterAC = (payload: { id: string; filter: FilterValuesType }) => {
  return { type: "CHANGE-TODOLIST-FILTER", payload } as const
}

export const changeTodolistEntityStatusAC = (payload: { id: string; entityStatus: RequestStatus }) => {
  return { type: "CHANGE-TODOLIST-ENTITY-STATUS", payload } as const
}

// Thunk
export const fetchTodolistsTC = () => (dispatch: AppDispatch) => {
  dispatch(setAppStatusAC("loading"))
  todolistsApi.getTodolistApi().then((res) => {
    dispatch(setAppStatusAC("succeeded"))
    dispatch(setTodolistsAC(res.data))
  })
}

export const addTodolistTC = (title: string) => (dispatch: AppDispatch) => {
  dispatch(setAppStatusAC("loading"))
  todolistsApi.createTodolist(title).then((res) => {
    if (res.data.resultCode === ResultCode.Success) {
      const newTodolist = (res.data.data.item)
      dispatch(setAppStatusAC("succeeded"))
      dispatch(addTodolistAC({ todolist: { ...newTodolist, filter: "all", entityStatus: "idle" } }))
    } else {
      handleAppErrors(dispatch, res.data)
    }
  })
    .catch((err) => {
      handleHttpErrors(err, dispatch)
      // dispatch(setAppErrorAC(err.message))
      // dispatch(setAppStatusAC("failed"))
    })
}

export const removeTodolistTC = (id: string) => (dispatch: AppDispatch) => {
  dispatch(setAppStatusAC("loading"))
  dispatch(changeTodolistEntityStatusAC({ entityStatus: "loading", id }))
  todolistsApi.removeTodolist(id).then((res) => {
    if (res.data.resultCode === ResultCode.Success) {
      dispatch(removeTodolistAC(id))
      dispatch(setAppStatusAC("succeeded"))
    } else {
      handleAppErrors(dispatch, res.data)
      dispatch(changeTodolistEntityStatusAC({ entityStatus: "succeeded", id }))
    }
  })
    .catch((err) => {
      handleHttpErrors(err, dispatch)
      dispatch(changeTodolistEntityStatusAC({ entityStatus: "succeeded", id }))
    })
}

export const updateTodolistTitleTC =
  (arg: { id: string; title: string }) => (dispatch: AppDispatch) => {
    todolistsApi.updateTodolistTitle(arg).then(() => {
      dispatch(changeTodolistTitleAC(arg))
    })
  }

export const updateTodolistFilterTC =
  (arg: { id: string; filter: FilterValuesType }) => (dispatch: AppDispatch) => {
    todolistsApi.updateTodolistFilter(arg).then(() => {
      dispatch(changeTodolistFilterAC(arg))
    })
  }