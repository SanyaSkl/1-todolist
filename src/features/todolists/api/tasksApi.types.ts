export type Task = {
    description: string
    title: string
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type GetTaskResponse = {
    items: Task[]
    totalCount: number
    error: string | null
}

export type UpdateTaskModel = {
    description: string
    title: string
    status: number
    priority: number
    startDate: string
    deadline: string
}