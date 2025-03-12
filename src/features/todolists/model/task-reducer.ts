import { AddTodolistActionType, RemoveTodolistActionType } from "./todolists-reducer"
import { tasksApi } from "../api/tasksApi"
import { DomainTask, UpdateTaskDomainModel } from "../api/tasksApi.types"
import { AppDispatch } from "app/store"
import { TaskStatus } from "common/enums/enums"

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
  tasksApi.getTaskApi(todolistId).then((res) => {
    const tasks = res.data.items
    dispatch(setTasksAC({ todolistId, tasks }))
  })
}

export const removeTaskTC = (arg: { taskId: string; todolistId: string }) => (dispatch: AppDispatch) => {
  tasksApi.removeTask(arg).then(() => {
    dispatch(removeTaskAC(arg))
  })
}

export const addTaskTC = (arg: { title: string; todolistId: string }) => (dispatch: AppDispatch) => {
  tasksApi.createTask(arg).then((res) => {
    dispatch(addTaskAC({ task: res.data.data.item }))
  })
}

export const updateTaskTC = (arg: { taskId: string; todolistId: string; domainModel: UpdateTaskDomainModel }) => (dispatch: AppDispatch) => {
  const { taskId, todolistId, domainModel } = arg;

  tasksApi.updateTask({
    taskId,
    todolistId,
    title: domainModel.title,
    status: domainModel.status
  }).then(() => {
    dispatch(updateTaskAC({
      taskId,
      todolistId,
      status: domainModel.status,
      title: domainModel.title || '' // Если title не передан, можно оставить пустым
    }));
  });
};

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
