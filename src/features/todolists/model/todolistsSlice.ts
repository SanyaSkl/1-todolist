import { Todolist } from "../api/todolistsApi.types"
import { AppDispatch } from "app/store"
import { todolistsApi } from "../api/todolistsApi"
import { RequestStatus, setAppStatus } from "app/appSlice"
import { ResultCode } from "common/enums/enums"
import { handleHttpErrors } from "common/handleHttpErrors"
import { handleServerAppError } from "common/handleServerAppError"
import { createSlice } from "@reduxjs/toolkit"

export type FilterValuesType = "all" | "active" | "completed"

export type DomainTodolist = Todolist & {
  filter: FilterValuesType
  entityStatus: RequestStatus
}

export const todolistsSlice = createSlice({
  name: "todolists",
  initialState: [] as DomainTodolist[],
  reducers: (create) => ({
    removeTodolist: create.reducer<{ id: string }>((state, action) => {

      // return state.filter((tl) => tl.id !== action.payload.id

      const index = state.findIndex(todo => todo.id === action.payload.id)
      if (index !== -1) {
        state.splice(index, 1)
      }
    }),
    addTodolist: create.reducer<{ todolist: DomainTodolist }>((state, action) => {
      const newTodolist: DomainTodolist = { ...action.payload.todolist, filter: "all", entityStatus: "idle" }
      state.unshift(newTodolist)
    }),
    changeTodolistTitle: create.reducer<{ id: string; title: string }>((state, action) => {
      const todolist = state.find(todo => todo.id === action.payload.id)
      if (!!todolist) {
        todolist.title = action.payload.title
      }
    }),
    changeTodolistFilter: create.reducer<{ id: string; filter: FilterValuesType }>((state, action) => {
      const index = state.findIndex(todo => todo.id === action.payload.id)
      if (index !== -1) {
        state[index].filter = action.payload.filter
      }
    }),
    changeTodolistEntityStatus: create.reducer<{ id: string; entityStatus: RequestStatus }>((state, action) => {
      const index = state.findIndex(todo => todo.id === action.payload.id)
      if (index !== -1) {
        state[index].entityStatus = action.payload.entityStatus
      }
    }),
    setTodolists: create.reducer<{ todolists: Todolist[] }>((state, action) => {
      // return state.map((tl) => ({ ...tl, filter: "all", entityStatus: "idle" }))

      action.payload.todolists.forEach((tl) => {
        state.push({ ...tl, filter: "all", entityStatus: "idle" })
      })
    }),
    clearTodolists: create.reducer(() => {
      return []
    })
  })
  // selectors: {
  //   selectTodolists: (state) => state.todolists
  // }
})

export const {
  removeTodolist,
  addTodolist,
  changeTodolistEntityStatus,
  changeTodolistFilter,
  changeTodolistTitle,
  setTodolists,
  clearTodolists
} = todolistsSlice.actions
export const todolistsReducer = todolistsSlice.reducer

// Thunk
export const fetchTodolistsTC = () => (dispatch: AppDispatch) => {
  dispatch(setAppStatus({ status: "loading" }))
  todolistsApi
    .getTodolistApi()
    .then((res) => {
      dispatch(setAppStatus({ status: "succeeded" }))
      dispatch(setTodolists({ todolists: res.data }))
    })
    .catch((err) => {
      handleHttpErrors(dispatch, err)
    })
}

export const addTodolistTC = (title: string) => (dispatch: AppDispatch) => {
  dispatch(setAppStatus({ status: "loading" }))

  todolistsApi
    .createTodolist(title)
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        const newTodolist: DomainTodolist = {
          ...res.data.data.item,
          filter: "all",
          entityStatus: "idle"
        }
        dispatch(setAppStatus({ status: "succeeded" }))
        dispatch(addTodolist({ todolist: newTodolist }))
      } else {
        handleServerAppError(dispatch, res.data)
      }
    })
    .catch((err) => {
      handleHttpErrors(dispatch, err)
      // dispatch(setAppErrorAC(err.message))
      // dispatch(setAppStatus({ status: "failed" }))
    })
}

export const removeTodolistTC = (id: string) => (dispatch: AppDispatch) => {
  dispatch(setAppStatus({ status: "loading" }))
  dispatch(changeTodolistEntityStatus({ entityStatus: "loading", id }))
  todolistsApi
    .removeTodolist(id)
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(removeTodolist({ id }))
        dispatch(setAppStatus({ status: "succeeded" }))
      } else {
        handleServerAppError(dispatch, res.data)
        dispatch(changeTodolistEntityStatus({ entityStatus: "succeeded", id }))
      }
    })
    .catch((err) => {
      handleHttpErrors(dispatch, err)
      dispatch(changeTodolistEntityStatus({ entityStatus: "succeeded", id }))
    })
}

export const updateTodolistTitleTC = (arg: { id: string; title: string }) => (dispatch: AppDispatch) => {
  dispatch(setAppStatus({ status: "loading" }))
  todolistsApi
    .updateTodolist(arg)
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setAppStatus({ status: "succeeded" }))
        dispatch(changeTodolistTitle(arg))
      } else {
        handleServerAppError(dispatch, res.data)
      }
    })
    .catch((err) => {
      handleHttpErrors(dispatch, err)
    })
}
