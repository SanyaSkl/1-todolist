import { Container } from "@mui/material"
import Grid from "@mui/material/Grid2"
import React from "react"
import { AddItemForm } from "common/components"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { Todolists } from "../features/todolists/ui/Todilists/Todolists"
import { addTodolistTC } from "../features/todolists/model/todolists-reducer"

export const Main = () => {
  const dispatch = useAppDispatch()

  const addTodolist = (title: string) => {
    dispatch(addTodolistTC(title))
  }

  return (
    <Container fixed>
      <Grid container sx={{ mb: "30px" }}>
        <AddItemForm addItem={addTodolist} />
      </Grid>
      <Grid container spacing={4}>
        <Todolists />
      </Grid>
    </Container>
  )
}
