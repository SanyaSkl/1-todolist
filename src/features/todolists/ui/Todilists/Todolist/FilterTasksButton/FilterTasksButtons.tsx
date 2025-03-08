import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import React from "react"
import { changeTodolistFilterAC, DomainTodolist, FilterValuesType } from "../../../../model/todolists-reducer"
import { filterButtonContainerSx } from "./FilterTasksButtons.style"

type Props = {
  todolist: DomainTodolist
}

export const FilterTasksButtons = ({ todolist }: Props) => {
  const dispatch = useAppDispatch()

  const changeFilterTasksHandler = (filter: FilterValuesType) => {
    dispatch(changeTodolistFilterAC({ id: todolist.id, filter }))
  }

  return (
    <>
      <Box sx={filterButtonContainerSx}>
        <Button
          variant={todolist.filter === "all" ? "outlined" : "contained"}
          color="secondary"
          onClick={() => changeFilterTasksHandler("all")}
        >
          All
        </Button>
        <Button
          variant={todolist.filter === "active" ? "outlined" : "contained"}
          color="primary"
          onClick={() => changeFilterTasksHandler("active")}
        >
          Active
        </Button>
        <Button
          variant={todolist.filter === "completed" ? "outlined" : "contained"}
          color="error"
          onClick={() => changeFilterTasksHandler("completed")}
        >
          Completed
        </Button>
      </Box>
    </>
  )
}
