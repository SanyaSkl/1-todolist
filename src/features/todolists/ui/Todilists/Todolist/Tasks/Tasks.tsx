import List from "@mui/material/List"
import { useAppSelector } from "common/hooks/useAppSelector"
import React, { useEffect } from "react"
import { selectTasks } from "../../../../model/tasksSelectors"
import { Task } from "../Task/Task"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { fetchTasksTC } from "../../../../model/task-reducer"
import { DomainTodolist } from "../../../../model/todolists-reducer"
import { TaskStatus } from "common/enums/enums"

type Props = {
  todolist: DomainTodolist
}

export const Tasks = ({ todolist }: Props) => {
  const tasks = useAppSelector(selectTasks)
  const allTasks = tasks[todolist.id]

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTasksTC(todolist.id))
  }, [])

  let tasksForTodolist = allTasks

  if (todolist.filter === "active") {
    tasksForTodolist = allTasks.filter((task) => task.status === TaskStatus.New)
  }
  if (todolist.filter === "completed") {
    tasksForTodolist = allTasks.filter((task) => task.status === TaskStatus.Completed)
  }

  return (
    <>
      {tasksForTodolist && tasksForTodolist.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <List>
          {tasksForTodolist && tasksForTodolist.map((task) => (
            <Task key={task.id} task={task} todolist={todolist} disabled={todolist.entityStatus === "loading"}/>
          ))}
        </List>
      )}
    </>
  )
}
