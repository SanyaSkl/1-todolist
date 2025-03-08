import DeleteIcon from "@mui/icons-material/Delete"
import IconButton from "@mui/material/IconButton"
import { EditableSpan } from "common/components"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import React from "react"
import { changeTodolistTitleAC, DomainTodolist, removeTodolistAC } from "../../../../model/todolists-reducer"
import styles from "./TodolistTitle.module.css"

type Props = {
  todolist: DomainTodolist
}
export const TodolistTitle = ({ todolist }: Props) => {
  const dispatch = useAppDispatch()

  const changeTodolistTitleHandler = (title: string) => {
    dispatch(changeTodolistTitleAC({ id: todolist.id, title }))
  }
  const removeTodolistHandler = () => {
    dispatch(removeTodolistAC(todolist.id))
  }
  return (
    <div className={styles.container}>
      <h3>
        <EditableSpan oldTitle={todolist.title} changeItem={changeTodolistTitleHandler} />
      </h3>
      <IconButton onClick={removeTodolistHandler}>
        <DeleteIcon />
      </IconButton>
    </div>
  )
}
