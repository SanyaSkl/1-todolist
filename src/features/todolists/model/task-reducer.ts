import { v1 } from "uuid"
import { AddTodolistActionType, RemoveTodolistActionType } from "./todolists-reducer"
import { TasksStateType } from "app/App"

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
  switch (action.type) {
    case "REMOVE_TASK": {
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].filter((t) => t.id !== action.payload.taskId),
      }
    }
    case "ADD_TASK": {
      const newTask = { id: v1(), title: action.payload.title, isDone: false }
      return { ...state, [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]] }
    }
    case "CHANGE_TASK_STATUS": {
      const { taskId, isDone, todolistId } = action.payload
      return {
        ...state,
        [todolistId]: state[todolistId].map((task) => (task.id === taskId ? { ...task, isDone } : task)),
      }
    }
    case "CHANGE_TASK_TITLE": {
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].map((task) =>
          task.id === action.payload.taskId ? { ...task, title: action.payload.title } : task,
        ),
      }
    }
    case "ADD-TODOLIST": {
      return { ...state, [action.payload.id]: [] }
    }
    case "REMOVE-TODOLIST": {
      const copyState = { ...state }
      delete copyState[action.payload.id]
      return copyState
    }
    default:
      return state
  }
}

// Action creators
export const removeTaskAC = (payload: { todolistId: string; taskId: string }) => {
  return { type: "REMOVE_TASK", payload } as const
}
export const addTaskAC = (payload: { todolistId: string; title: string }) => {
  return { type: "ADD_TASK", payload } as const
}
export const changeTaskStatusAC = (payload: { taskId: string; todolistId: string; isDone: boolean }) => {
  return { type: "CHANGE_TASK_STATUS", payload } as const
}
export const changeTaskTitleAC = (payload: { taskId: string; todolistId: string; title: string }) => {
  return { type: "CHANGE_TASK_TITLE", payload } as const
}

// Actions types
export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>

type ActionsType =
  | RemoveTaskActionType
  | AddTaskActionType
  | ChangeTaskStatusActionType
  | ChangeTaskTitleActionType
  | AddTodolistActionType
  | RemoveTodolistActionType
