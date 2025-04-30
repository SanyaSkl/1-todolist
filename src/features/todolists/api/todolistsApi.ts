import { instance } from "common/instance/instance"
import { Todolist } from "./todolistsApi.types"
import { FilterValuesType } from "../model/todolists-reducer"
import { BaseResponse } from "common/types"

export const todolistsApi = {
  getTodolistApi() {
    return instance.get<Todolist[]>("todo-lists")
  },

  updateTodolistTitle(payload: { id: string; title: string }) {
    const { title, id } = payload
    return instance.put<BaseResponse>(`todo-lists/${id}`, { title })
  },

  updateTodolistFilter(payload: { id: string; filter: FilterValuesType }) {
    const { filter, id } = payload
    return instance.put<BaseResponse>(`todo-lists/${id}`, { filter })
  },

  createTodolist(title: string) {
    return instance.post<BaseResponse<{ item: Todolist }>>("todo-lists", { title })
  },

  removeTodolist(id: string) {
    return instance.delete<BaseResponse>(`todo-lists/${id}`)
  },
}
