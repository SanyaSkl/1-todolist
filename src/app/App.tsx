import {CssBaseline} from "@mui/material";
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper'
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AddItemForm} from "../AddItemForm";
import ButtonAppBar from "../ButtonAppBar";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../model/task-reducer";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
} from "../model/todolists-reducer";
import {Todolist} from "../Todolist";
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
type ThemeMode = 'dark' | 'light'

function App() {

    const tasks = useSelector<RootState, TasksStateType>(state => state.tasks)
    const todolists = useSelector<RootState, TodolistType[]>(state => state.todolists)

    const dispatch = useDispatch()

    const removeTodolist = (todolistId: string) => {
        dispatch(removeTodolistAC(todolistId))
    }

    const addTodolist = (title: string) => {
        dispatch(addTodolistAC(title))
    }

    const changeFilter = (filter: FilterValuesType, id: string) => {
        dispatch(changeTodolistFilterAC({id, filter}))
    }

    const changeTodolistTitle = (id: string, title: string) => {
        dispatch(changeTodolistTitleAC({id, title}))
    }


    const removeTask = (taskId: string, todolistId: string) => {
        dispatch(removeTaskAC({todolistId, taskId}))
    }

    const addTask = (title: string, todolistId: string) => {
        dispatch(addTaskAC({todolistId, title}))
    }

    const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        dispatch(changeTaskStatusAC({taskId, isDone, todolistId}))
    }

    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        dispatch(changeTaskTitleAC({taskId, todolistId, title}))
    }


    const [themeMode, setThemeMode] = useState<ThemeMode>('light')
    const theme = createTheme({
        palette: {
            mode: themeMode,
            primary: {
                main: '#505383',
            },
        },
    });

    const changeModeHandler = () => {
        setThemeMode(themeMode === 'light' ? 'dark' : 'light')
    }

    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <Container fixed>
                    <ButtonAppBar onChange={changeModeHandler}/>

                    <Grid container sx={{ml: '60px'}}>
                        <AddItemForm addItem={addTodolist}/>
                    </Grid>

                    <Grid container>
                        {todolists.map((tl) => {

                            const allTodolistTasks = tasks[tl.id]
                            let tasksForTodolist = allTodolistTasks

                            if (tl.filter === 'active') {
                                tasksForTodolist = allTodolistTasks.filter(task => !task.isDone)
                            }

                            if (tl.filter === 'completed') {
                                tasksForTodolist = allTodolistTasks.filter(task => task.isDone)
                            }

                            return (
                                <Grid sx={{p: '30px'}} key={tl.id}>
                                    <Paper elevation={3} sx={{p: '30px'}}>
                                        <Todolist
                                            todolistId={tl.id}
                                            title={tl.title}
                                            tasks={tasksForTodolist}
                                            removeTask={removeTask}
                                            changeFilter={changeFilter}
                                            addTask={addTask}
                                            changeTaskStatus={changeTaskStatus}
                                            filter={tl.filter}
                                            removeTodolist={removeTodolist}
                                            changeTaskTitle={changeTaskTitle}
                                            changeTodolistTitle={changeTodolistTitle}
                                        />
                                    </Paper>
                                </Grid>
                            )
                        })}
                    </Grid>
                </Container>
                <CssBaseline/>
            </ThemeProvider>
        </div>
    );
}

export default App;
