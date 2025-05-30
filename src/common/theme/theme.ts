import { createTheme } from "@mui/material/styles"
import { ThemeMode } from "app/appSlice"

export const getTheme = (themeMode: unknown) => {
  return createTheme({
    palette: {
      mode: themeMode === "light" ? "light" : "dark",
      primary: {
        main: "#087EA4",
      },
    },
  })
}
