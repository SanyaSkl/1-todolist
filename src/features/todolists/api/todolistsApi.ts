import { instance } from "common/instance/instance"
import { Response, Todolist } from "./todolistsApi.types"
import { FilterValuesType } from "../model/todolists-reducer"

export const todolistsApi = {
  getTodolistApi() {
    return instance.get<Todolist[]>("todo-lists")
  },

  updateTodolistTitle(payload: { id: string; title: string }) {
    const { title, id } = payload
    return instance.put<Response>(`todo-lists/${id}`, { title })
  },

  updateTodolistFilter(payload: { id: string; filter: FilterValuesType }) {
    const { filter, id } = payload
    return instance.put<Response>(`todo-lists/${id}`, { filter })
  },

  createTodolist(title: string) {
    return instance.post<Response<{ item: Todolist }>>("todo-lists", { title })
  },

  removeTodolist(id: string) {
    return instance.delete<Response>(`todo-lists/${id}`)
  },
}
