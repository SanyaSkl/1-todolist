import DeleteIcon from "@mui/icons-material/Delete"
import IconButton from "@mui/material/IconButton"
import { EditableSpan } from "common/components"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import React from "react"
import { DomainTodolist, removeTodolistTC, updateTodolistTitleTC } from "../../../../model/todolists-reducer"
import styles from "./TodolistTitle.module.css"

type Props = {
  todolist: DomainTodolist
}
export const TodolistTitle = ({ todolist }: Props) => {
  const { title, id, entityStatus } = todolist

  const dispatch = useAppDispatch()

  const changeTodolistTitleHandler = (title: string) => {
    dispatch(updateTodolistTitleTC({ id, title }))
  }
  const removeTodolistHandler = () => {
    dispatch(removeTodolistTC(id))
  }
  return (
    <div className={styles.container}>
      <h3>
        <EditableSpan oldTitle={title} changeItem={changeTodolistTitleHandler} />
      </h3>
      <IconButton onClick={removeTodolistHandler} disabled={entityStatus === "loading"}>
        <DeleteIcon />
      </IconButton>
    </div>
  )
}
