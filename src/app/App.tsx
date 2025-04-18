import { CssBaseline } from "@mui/material"
import { ThemeProvider } from "@mui/material/styles"
import { Header } from "common/components/Header/Header"
import { useAppSelector } from "common/hooks/useAppSelector"
import { getTheme } from "common/theme/theme"
import { selectTheme } from "./appSelectors"
import { Main } from "./Main"
import { useEffect } from "react"
import { fetchTodolistsTC } from "../features/todolists/model/todolists-reducer"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { DomainTask } from "../features/todolists/api/tasksApi.types"
import { ErrorSnackbar } from "common/components/ErrorSnackbar"

export type TasksStateType = {
  [key: string]: DomainTask[]
}

export const App = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchTodolistsTC)
  }, [])
  const themeMode = useAppSelector(selectTheme)


  //const theme = getTheme(themeMode)
  return (
    <ThemeProvider theme={getTheme(themeMode)}>
      <CssBaseline />
      <Header />
      <Main />
      <ErrorSnackbar/>
    </ThemeProvider>
  )
}
