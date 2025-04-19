import { AddTodolistActionType, RemoveTodolistActionType } from "./todolists-reducer"
import { tasksApi } from "../api/tasksApi"
import { DomainTask, UpdateTaskDomainModel } from "../api/tasksApi.types"
import { AppDispatch } from "app/store"
import { ResultCode, TaskStatus } from "common/enums/enums"
import { setAppErrorAC, setAppStatusAC } from "app/app-reducer"
import { handleHttpErrors } from "common/handleHttpErrors"

export type TasksStateType = {
  [key: string]: DomainTask[]
}

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
  switch (action.type) {
    case "SET-TASKS": {
      const stateCopy = { ...state }
      stateCopy[action.payload.todolistId] = action.payload.tasks
      return stateCopy
    }
    case "REMOVE_TASK": {
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].filter((t) => t.id !== action.payload.taskId)
      }
    }
    case "ADD_TASK": {
      const newTask: DomainTask = action.payload.task
      return {
        ...state, [newTask.todoListId]: [action.payload.task, ...state[newTask.todoListId]]
      }
    }
    case "UPDATE-TASK": {
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].map
        ((t) => {
          if (t.id === action.payload.taskId) {
            return {
              ...t,
              status: action.payload.status,
              title: action.payload.title
            }
          }
          return t
        })
      }
    }
    case "ADD-TODOLIST": {
      return { ...state, [action.payload.todolist.id]: [] }
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
export const setTasksAC = (payload: { todolistId: string; tasks: DomainTask[] }) => {
  return { type: "SET-TASKS", payload } as const
}

export const removeTaskAC = (payload: { todolistId: string; taskId: string }) => {
  return { type: "REMOVE_TASK", payload } as const
}

export const addTaskAC = (payload: { task: DomainTask }) => {
  return { type: "ADD_TASK", payload } as const
}

export const updateTaskAC = (payload: { taskId: string; todolistId: string; status: TaskStatus, title: string }) => {
  return { type: "UPDATE-TASK", payload } as const
}

// Thunk
export const fetchTasksTC = (todolistId: string) => (dispatch: AppDispatch) => {
  dispatch(setAppStatusAC("loading"))
  tasksApi.getTaskApi(todolistId).then((res) => {
    const tasks = res.data.items
    dispatch(setAppStatusAC("succeeded"))
    dispatch(setTasksAC({ todolistId, tasks }))
  })
}

export const removeTaskTC = (arg: { taskId: string; todolistId: string }) => (dispatch: AppDispatch) => {
  dispatch(setAppStatusAC("loading"))
  tasksApi.removeTask(arg).then((res) => {
    if (res.data.resultCode === ResultCode.Success) {
      dispatch(setAppStatusAC("succeeded"))
      dispatch(removeTaskAC(arg))
    } else {
      dispatch(setAppErrorAC(res.data.messages.length ? res.data.messages[0] : "Some error occurred"))
      dispatch(setAppStatusAC("failed"))
    }
  })
    .catch((err) => {
      handleHttpErrors(err, dispatch)
    })
}

export const addTaskTC = (arg: { title: string; todolistId: string }) => (dispatch: AppDispatch) => {
  dispatch(setAppStatusAC("loading"))
  tasksApi.createTask(arg).then((res) => {
    if (res.data.resultCode === ResultCode.Success) {
      dispatch(addTaskAC({ task: res.data.data.item }))
      dispatch(setAppStatusAC("succeeded"))
    } else {
      dispatch(setAppErrorAC(res.data.messages.length ? res.data.messages[0] : "Some error occurred"))
      dispatch(setAppStatusAC("failed"))
    }
  })
    .catch((err) => {
      handleHttpErrors(err, dispatch)
    })
  // .finally(() => {
  //   dispatch(setAppStatusAC("idle"))
  // })
}

export const updateTaskTC = (arg: { taskId: string; todolistId: string; domainModel: UpdateTaskDomainModel }) =>
  (dispatch: AppDispatch) => {
    const { taskId, todolistId, domainModel } = arg
    dispatch(setAppStatusAC("loading"))
    tasksApi.updateTask({
      taskId,
      todolistId,
      title: domainModel.title,
      status: domainModel.status
    }).then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(updateTaskAC({
          taskId,
          todolistId,
          status: domainModel.status,
          title: domainModel.title || "" // Если title не передан, можно оставить пустым
        }))
        dispatch(setAppStatusAC("succeeded"))
      } else {
        dispatch(setAppErrorAC(res.data.messages.length ? res.data.messages[0] : "Some error occurred"))
        dispatch(setAppStatusAC("failed"))
      }
    })
      .catch((err) => {
        handleHttpErrors(err, dispatch)
      })
  }

// Actions types
export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type UpdateTaskActionType = ReturnType<typeof updateTaskAC>
export type SetTaskActionType = ReturnType<typeof setTasksAC>

type ActionsType =
  | RemoveTaskActionType
  | AddTaskActionType
  | UpdateTaskActionType
  | AddTodolistActionType
  | RemoveTodolistActionType
  | SetTaskActionType
