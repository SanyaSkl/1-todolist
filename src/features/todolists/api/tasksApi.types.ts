import { TaskPriority, TaskStatus } from "common/enums/enums"

export type DomainTask = {
  isDone: any
  description: string
  title: string
  status: TaskStatus
  priority: TaskPriority
  startDate: string
  deadline: string
  id: string
  todoListId: string
  order: number
  addedDate: string
}

export type GetTaskResponse = {
  items: DomainTask[]
  totalCount: number
  error: string | null
}

export type UpdateTaskModel = {
  description: string
  title?: string
  status?: TaskStatus
  priority: TaskPriority
  startDate: string
  deadline: string
}

export type UpdateTaskDomainModel = {
  title?: string
  description?: string
  status: TaskStatus
  priority?: TaskPriority
  startDate?: string
  deadline?: string
}
