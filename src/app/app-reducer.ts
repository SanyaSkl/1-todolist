export type ThemeMode = "dark" | "light"
export type RequestStatus = "idle" | "loading" | "succeeded" | "failed"

type InitialState = typeof initialState

const initialState = {
  themeMode: "light" as ThemeMode,
  status: "idle" as RequestStatus,
  error: null as string | null
}


export const appReducer = (state: InitialState = initialState, action: ActionsType): InitialState => {
  switch (action.type) {
    case "SWITCH_THEME":
      return { ...state, themeMode: action.payload.theme }

    case "SET_STATUS":
      return { ...state, status: action.payload.status }

    case "SET_ERROR":
      return { ...state, error: action.payload.error }

    default:
      return state
  }
}

// Action creators
export const switchThemeAC = (theme: ThemeMode) => {
  return {
    type: "SWITCH_THEME",
    payload: { theme }
  } as const
}

export const setAppStatusAC = (status: RequestStatus) => {
  return {
    type: "SET_STATUS",
    payload: { status }
  } as const
}

export const setAppErrorAC = (error: string | null) => {
  return {
    type: "SET_ERROR",
    payload: { error }
  } as const
}

// Actions types
export type SwitchThemeActionType = ReturnType<typeof switchThemeAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>

export type ActionsType = SwitchThemeActionType | SetAppStatusActionType | SetAppErrorActionType

