import Grid from "@mui/material/Grid2"
import Paper from "@mui/material/Paper"
import { useAppSelector } from "common/hooks/useAppSelector"
import React, { useEffect } from "react"
import { selectTodolists } from "../../../model/todolistsSelectors"
import { Todolist } from "./Todolist/Todolist"
import { todolistsApi } from "../../../api/todolistsApi"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { fetchTodolistsTC } from "../../../model/todolists-reducer"

export const Todolists = () => {
  const todolists = useAppSelector(selectTodolists)
  const dispatch = useAppDispatch()

  useEffect(() => {
    todolistsApi.getTodolistApi().then(() => {
      dispatch(fetchTodolistsTC())
    })
  }, [])
  return (
    <>
      {todolists.map((tl) => {
        return (
          <Grid key={tl.id}>
            <Paper sx={{ p: "0 20px 20px 20px" }}>
              <Todolist key={tl.id} todolist={tl} />
            </Paper>
          </Grid>
        )
      })}
    </>
  )
}
