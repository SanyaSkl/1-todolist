import { Container } from "@mui/material"
import Grid from "@mui/material/Grid2"
import React, { useEffect } from "react"
import { AddItemForm } from "common/components"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { Todolists } from "../features/todolists/ui/Todilists/Todolists"
import { addTodolistTC } from "../features/todolists/model/todolistsSlice"

import { useAppSelector } from "common/hooks/useAppSelector"
import { useNavigate } from "react-router"
import { Path } from "common/routing/Routing"
import { selectIsLoggedIn } from "features/auth/model/authSlice"

export const Main = () => {
  const dispatch = useAppDispatch()

  const addTodolist = (title: string) => {
    dispatch(addTodolistTC(title))
  }

  const navigate = useNavigate()

  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  useEffect(() => {
    if (!isLoggedIn) {
      navigate(Path.Login)
    }
  }, [isLoggedIn])

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
