import { AddItemForm } from "common/components"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { FilterTasksButtons } from "./FilterTasksButton/FilterTasksButtons"
import { addTaskAC, addTaskTC } from "../../../model/task-reducer"
import { Tasks } from "./Tasks/Tasks"
import { TodolistTitle } from "./TodolistTitle/TodolistTitle"
import { DomainTodolist } from "../../../model/todolists-reducer"

type PropsType = {
  todolist: DomainTodolist
}

export const Todolist = ({ todolist }: PropsType) => {
  const dispatch = useAppDispatch()

  const addTaskHandler = (title: string) => {
    dispatch(addTaskTC({ todolistId: todolist.id, title }))
  }

  return (
    <div>
      <TodolistTitle todolist={todolist} />
      <AddItemForm addItem={addTaskHandler} />
      <Tasks todolist={todolist} />
      <FilterTasksButtons todolist={todolist} />
    </div>
  )
}
