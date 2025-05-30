import { instance } from "common/instance/instance"
import { Todolist } from "./todolistsApi.types"
import { BaseResponse } from "common/types"

export const todolistsApi = {
  getTodolistApi() {
    return instance.get<Todolist[]>("todo-lists")
  },

  updateTodolist(payload: { id: string; title: string }) {
    const { title, id } = payload
    return instance.put<BaseResponse>(`todo-lists/${id}`, { title })
  },

  createTodolist(title: string) {
    return instance.post<BaseResponse<{ item: Todolist }>>("todo-lists", { title })
  },

  removeTodolist(id: string) {
    return instance.delete<BaseResponse>(`todo-lists/${id}`)
  }
}
