import { instance } from "common/instance/instance"
import { GetTaskResponse, DomainTask, UpdateTaskModel, UpdateTaskDomainModel } from "./tasksApi.types"
import { Response } from "./todolistsApi.types"

export const tasksApi = {
  getTaskApi(todolistId: string) {
    return instance.get<GetTaskResponse>(`todo-lists/${todolistId}/tasks`)
  },

  createTask(payload: { title: string; todolistId: string }) {
    const { title, todolistId } = payload
    return instance.post<Response<{ item: DomainTask }>>(`todo-lists/${todolistId}/tasks`, { title })
  },

  removeTask(payload: { taskId: string; todolistId: string }) {
    const { taskId, todolistId } = payload
    return instance.delete<Response>(`todo-lists/${todolistId}/tasks/${taskId}`)
  },

  updateTaskStatus(payload: { todolistId: string; model: UpdateTaskDomainModel; taskId: string }) {
    const { taskId, todolistId, model } = payload
    return instance.put<Response>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
  },

  updateTaskTitle(payload: { taskId: string; title: string; todolistId: string }) {
    const { taskId, title, todolistId } = payload
    return instance.put(`todo-lists/${todolistId}/tasks/${taskId}`, { title })
  },
}
