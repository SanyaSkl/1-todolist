import { combineReducers, UnknownAction } from "redux"
import { todolistsReducer } from "../features/todolists/model/todolists-reducer"
import { tasksReducer } from "../features/todolists/model/task-reducer"
import { appReducer } from "./app-reducer"
import { ThunkDispatch } from "redux-thunk"
import { authReducer } from "../features/auth/model/authSlice"
import { configureStore } from "@reduxjs/toolkit"

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
  app: appReducer,
  auth: authReducer
})
// непосредственно создаём store
export const store = configureStore({ reducer: rootReducer })

// определить автоматически тип всего объекта состояния
export type RootState = ReturnType<typeof store.getState>
//export type AppDispatch = typeof store.dispatch
export type AppDispatch = ThunkDispatch<RootState, unknown, UnknownAction>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store
