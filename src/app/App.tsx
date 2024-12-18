import {CssBaseline} from "@mui/material";
import {ThemeProvider} from '@mui/material/styles';
import {useDispatch, useSelector} from "react-redux";
import {getTheme} from "../common/theme/theme";
import {Header} from "../Header";
import Main from "../Main";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../model/task-reducer";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
} from "../model/todolists-reducer";
import {ThemeMode} from "./app-reducer";
import './App.css';
import {RootState} from "./store";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: TaskType[]
}

function App() {

    const themeMode = useSelector<RootState, ThemeMode>(state => state.app.themeMode)

    const theme = getTheme(themeMode)

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Header/>
            <Main/>
        </ThemeProvider>
    );
}

export default App;
