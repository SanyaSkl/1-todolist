import { CircularProgress, CssBaseline } from "@mui/material"
import { ThemeProvider } from "@mui/material/styles"
import { Header } from "common/components/Header/Header"
import { useAppSelector } from "common/hooks/useAppSelector"
import { getTheme } from "common/theme/theme"
import { useEffect } from "react"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { DomainTask } from "../features/todolists/api/tasksApi.types"
import { ErrorSnackbar } from "common/components/ErrorSnackbar/ErrorSnackbar"
import { Routing } from "common/routing/Routing"
import { initializeAppTC, selectIsInitialized } from "../features/auth/model/authSlice"
import s from "./App.module.css"
import { selectThemeMode } from "app/appSlice"

export type TasksStateType = {
  [key: string]: DomainTask[]
}

export const App = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const isInitialized = useAppSelector(selectIsInitialized)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(initializeAppTC())
  }, [])


  //const theme = getTheme(themeMode)
  return (
    <ThemeProvider theme={getTheme(themeMode)}>
      <CssBaseline />
      {isInitialized && (
        <>
          <Header />
          <Routing />
        </>
      )}
      {(!isInitialized) && (
        <div className={s.circularProgressContainer}>
          <CircularProgress size={150} thickness={3} />
        </div>
      )}
      <ErrorSnackbar />
    </ThemeProvider>
  )
}
