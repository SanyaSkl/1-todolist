import { tasksApi } from "../api/tasksApi"
import { DomainTask, UpdateTaskDomainModel, UpdateTaskModel } from "../api/tasksApi.types"
import { ResultCode } from "common/enums/enums"
import { setAppStatus } from "app/appSlice"
import { handleServerNetworkError } from "common/utils/handleServerNetworkError"
import { handleServerAppError } from "common/utils/handleServerAppError"
import { createSlice } from "@reduxjs/toolkit"
import { addTodolist, removeTodolist } from "./todolistsSlice"
import { AppDispatch, RootState } from "app/store"


export type TasksStateType = {
  [key: string]: DomainTask[]
}

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: {} as TasksStateType,
  reducers: (create) => ({
    setTasks: create.reducer<{ todolistId: string; tasks: DomainTask[] }>((state, action) => {
      state[action.payload.todolistId] = action.payload.tasks
    }),
    removeTask: create.reducer<{ taskId: string; todolistId: string }>((state, action) => {
      const tasks = state[action.payload.todolistId]
      const index = tasks.findIndex((t) => t.id === action.payload.taskId)
      if (index !== -1) {
        tasks.splice(index, 1)
      }
    }),
    addTask: create.reducer<{ task: DomainTask }>((state, action) => {
      const tasks = state[action.payload.task.todoListId]
      tasks.unshift(action.payload.task)
    }),
    updateTask: create.reducer<{ taskId: string; todolistId: string; domainModel: UpdateTaskDomainModel }>(
      (state, action) => {
        const tasks = state[action.payload.todolistId]
        const index = tasks.findIndex((t) => t.id === action.payload.taskId)
        if (index !== -1) {
          tasks[index] = { ...tasks[index], ...action.payload.domainModel }
        }
      }
    ),
    clearTasks: create.reducer(() => {
      return {}
    })
  }),
  extraReducers: (builder) => {
    builder
      .addCase(addTodolist, (state, action) => {
        state[action.payload.todolist.id] = []
      })
      .addCase(removeTodolist, (state, action) => {
        delete state[action.payload.id]
      })
  },
  selectors: {
    selectTasks: (state) => state
  }
})

export const {
  addTask,
  removeTask,
  updateTask,
  clearTasks,
  setTasks
} = tasksSlice.actions
export const { selectTasks } = tasksSlice.selectors
export const tasksReducer = tasksSlice.reducer

// Thunk
export const fetchTasksTC = (todolistId: string) => (dispatch: AppDispatch) => {
  dispatch(setAppStatus({ status: "loading" }))
  tasksApi.getTaskApi(todolistId).then((res) => {
    const tasks = res.data.items
    dispatch(setAppStatus({ status: "succeeded" }))
    dispatch(setTasks({ tasks: tasks, todolistId }))
  })
}

export const removeTaskTC = (arg: { todolistId: string; taskId: string; }) => (dispatch: AppDispatch) => {
  dispatch(setAppStatus({ status: "loading" }))
  tasksApi.removeTask(arg).then((res) => {
    if (res.data.resultCode === ResultCode.Success) {
      dispatch(setAppStatus({ status: "succeeded" }))
      dispatch(removeTask(arg))
    } else {
      handleServerAppError(dispatch, res.data)
    }
  })
    .catch((err) => {
      handleServerNetworkError(dispatch, err)
    })
}

export const addTaskTC = (arg: { title: string; todolistId: string }) => (dispatch: AppDispatch) => {
  dispatch(setAppStatus({ status: "loading" }))
  tasksApi.createTask(arg).then((res) => {
    if (res.data.resultCode === ResultCode.Success) {
      dispatch(addTask({ task: res.data.data.item }))
      dispatch(setAppStatus({ status: "succeeded" }))
    } else {
      handleServerAppError(dispatch, res.data)
    }
  })
    .catch((err) => {
      handleServerNetworkError(dispatch, err)
    })
  // .finally(() => {
  //   dispatch(setAppStatusAC("idle"))
  // })
}

export const updateTaskTC =
  (arg: { taskId: string; todolistId: string; domainModel: UpdateTaskDomainModel }) =>
    (dispatch: AppDispatch, getState: () => RootState) => {
      const { taskId, todolistId, domainModel } = arg

      const allTasksFromState = getState().tasks
      const tasksForCurrentTodolist = allTasksFromState[todolistId]
      const task = tasksForCurrentTodolist.find((t) => t.id === taskId)

      if (task) {
        const model: UpdateTaskModel = {
          status: task.status,
          title: task.title,
          deadline: task.deadline,
          description: task.description,
          priority: task.priority,
          startDate: task.startDate,
          ...domainModel
        }

        dispatch(setAppStatus({ status: "loading" }))
        tasksApi
          .updateTask({ taskId, todolistId, model })
          .then((res) => {
            if (res.data.resultCode === ResultCode.Success) {
              dispatch(setAppStatus({ status: "succeeded" }))
              dispatch(updateTask(arg))
            } else {
              handleServerAppError(dispatch, res.data)
            }
          })
          .catch((error) => {
            handleServerAppError(dispatch, error)
          })
      }
    }

