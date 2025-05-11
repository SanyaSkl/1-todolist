import DeleteIcon from "@mui/icons-material/Delete"
import Checkbox from "@mui/material/Checkbox"
import IconButton from "@mui/material/IconButton"
import ListItem from "@mui/material/ListItem"
import { EditableSpan } from "common/components"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import React, { ChangeEvent } from "react"
import { getListItemSx } from "./Task.styles"
import { DomainTask } from "../../../../../api/tasksApi.types"
import { DomainTodolist } from "../../../../../model/todolists-reducer"
import { TaskStatus } from "common/enums/enums"
import { removeTaskTC, updateTaskTC } from "../../../../../model/task-reducer"

type Props = {
  task: DomainTask
  todolist: DomainTodolist
  disabled?: boolean
}

export const Task = ({ task, todolist, disabled }: Props) => {
  const dispatch = useAppDispatch()

  const removeTaskHandler = () => {
    dispatch(removeTaskTC({ taskId: task.id, todolistId: todolist.id }))
  }

  const changeTaskHandler = (newTitle: string, newStatus: TaskStatus) => {
    dispatch(updateTaskTC({
      taskId: task.id,
      todolistId: todolist.id,
      domainModel: {
        title: newTitle,
        status: newStatus
      }
    }));
  };

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const newStatus = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New;
    changeTaskHandler(task.title, newStatus); // Используем changeTaskHandler
  }

  const changeTaskTitleHandler = (newTitle: string) => {
    changeTaskHandler(newTitle, task.status); // Используем changeTaskHandler с текущим статусом
  };

  return (
    <ListItem key={task.id} sx={getListItemSx(task.status === TaskStatus.Completed)}>
      <div>
        <Checkbox
          checked={task.status === TaskStatus.Completed}
          onChange={changeTaskStatusHandler}
          disabled={disabled}
        />
        <EditableSpan
          oldTitle={task.title}
          changeItem={changeTaskTitleHandler}
          disable={disabled}
        />
      </div>
      <IconButton onClick={removeTaskHandler} disabled={disabled}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  )
}
