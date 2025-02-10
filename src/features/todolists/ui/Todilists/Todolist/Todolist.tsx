import { useDispatch } from "react-redux"
import { AddItemForm } from "../../../../../common/components/AddItemForm/AddItemForm"
import type { TodolistType } from "../../../../../app/App"
import { useAppDispatch } from "../../../../../common/hooks/useAppDispatch"
import { FilterTasksButtons } from "./FilterTasksButton/FilterTasksButtons"
import { addTaskAC } from "../../../model/task-reducer"
import { Tasks } from "./Tasks/Tasks"
import { TodolistTitle } from "./TodolistTitle/TodolistTitle"

type PropsType = {
  todolist: TodolistType
}

export const Todolist = ({ todolist }: PropsType) => {
  const dispatch = useAppDispatch()

  const addTaskHandler = (title: string) => {
    dispatch(addTaskAC({ todolistId: todolist.id, title }))
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
