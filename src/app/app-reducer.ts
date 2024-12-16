export type ThemeMode = 'dark' | 'light'
type InitialState = typeof initialState

const initialState = {
    themeMode: 'light' as ThemeMode
}

export const appReducer = (state: InitialState = initialState, action: ActionsType): InitialState => {
    switch (action.type) {
        case 'SWITCH_THEME': {
            return {
                ...state,
            themeMode: action.payload.theme}
        }
        default:
            return state
    }
}

// Action creators
export const switchThemeAC = (theme: ThemeMode) => {
    return {
        type: 'SWITCH_THEME',
        payload: {theme}
    } as const
}

// Actions types
export type SwitchThemeActionType = ReturnType<typeof switchThemeAC>

type ActionsType = SwitchThemeActionType