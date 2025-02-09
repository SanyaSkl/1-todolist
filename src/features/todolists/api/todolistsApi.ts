import {instance} from '../../../common/instance/instance';
import {Response, Todolist} from './todolistsApi.types';

export const todolistsApi = {
    getTodolistApi() {
        return instance.get<Todolist[]>('todo-lists')
    },

    updateTodolist(payload: { id: string, title: string }) {
        const {title, id} = payload
        return instance.put<Response>(`todo-lists/${id}`, {title})
    },

    createTodolist(title: string) {
        return instance.post<Response<{ item: Todolist }>>('todo-lists', {title})
    },

    removeTodolist(id: string) {
        return instance.delete<Response>(`todo-lists/${id}`)
    }
}