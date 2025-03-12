import { instance } from "common/instance/instance"
import { DomainTask, GetTaskResponse } from "./tasksApi.types"
import { Response } from "./todolistsApi.types"
import { TaskStatus } from "common/enums/enums"

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

  updateTask(payload: { taskId: string; title?: string; status?: TaskStatus; todolistId: string }) {
    const { taskId, title, status, todolistId } = payload
    return instance.put<Response>(`todo-lists/${todolistId}/tasks/${taskId}`, {
      ...(title && { title }), // Добавляем title только если он есть
      ...(status !== undefined && { status }) // Добавляем status только если он определен
    })
  }
}
