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
    const status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
    dispatch(updateTaskTC({
      taskId: task.id,
      todolistId: todolist.id,
      domainModel: { ...task, status },
      title: task.title
    }))
  }

  const changeTaskTitleHandler = (newTitle: string) => {
    dispatch(updateTaskTC({
      taskId: task.id,
      todolistId: todolist.id,
      domainModel: { ...task, status: task.status }, // Статус остается прежним
      title: newTitle, // title передаётся отдельно
    }));
  };

  return (
    <ListItem key={task.id} sx={getListItemSx(task.status === TaskStatus.Completed)}>
      <div>
        <Checkbox checked={task.status === TaskStatus.Completed} onChange={changeTaskStatusHandler} />
        <EditableSpan oldTitle={task.title} changeItem={changeTaskTitleHandler} />
      </div>
      <IconButton onClick={removeTaskHandler}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  )
}
