import DeleteIcon from "@mui/icons-material/Delete"
import Checkbox from "@mui/material/Checkbox"
import IconButton from "@mui/material/IconButton"
import ListItem from "@mui/material/ListItem"
import { EditableSpan } from "common/components"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import React, { ChangeEvent } from "react"
import { getListItemSx } from "./Task.styles"
import { DomainTask } from "../../../../api/tasksApi.types"
import { DomainTodolist } from "../../../../model/todolists-reducer"
import { TaskStatus } from "common/enums/enums"
import { removeTaskTC, updateTaskTC } from "../../../../model/task-reducer"

type Props = {
  task: DomainTask
  todolist: DomainTodolist
}

export const Task = ({ task, todolist }: Props) => {
  const dispatch = useAppDispatch()

  const removeTaskHandler = () => {
    dispatch(removeTaskTC({ taskId: task.id, todolistId: todolist.id }))
  }
  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.new;

    // Вызываем один thunk для обновления статуса
    dispatch(updateTaskTC({
      taskId: task.id,
      todolistId: todolist.id,
      domainModel: { status }, // Передаем только статус
      title: task.title // Заголовок остается прежним
    }));
  };

  const changeTaskTitleHandler = (newTitle: string) => {
    // Вызываем один thunk для обновления заголовка
    dispatch(updateTaskTC({
      taskId: task.id,
      todolistId: todolist.id,
      domainModel: { status: task.status }, // Статус остается прежним
      title: newTitle // Передаем новый заголовок
    }));
  };

  return (
    <ListItem key={task.id} sx={getListItemSx(task.isDone)}>
      <div>
        <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler} />
        <EditableSpan oldTitle={task.title} changeItem={changeTaskTitleHandler} />
      </div>
      <IconButton onClick={removeTaskHandler}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  )
}
