import { CssBaseline } from "@mui/material"
import { ThemeProvider } from "@mui/material/styles"
import { Header } from "../common/components/Header/Header"
import { useAppSelector } from "../common/hooks/useAppSelector"
import { getTheme } from "../common/theme/theme"
import { selectTheme } from "./appSelectors"
import { Main } from "./Main"

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed"

export type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}

export type TasksStateType = {
  [key: string]: TaskType[]
}

function App() {
  const themeMode = useAppSelector(selectTheme)

  const theme = getTheme(themeMode)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Main />
    </ThemeProvider>
  )
}

export default App
