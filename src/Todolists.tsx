import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {FilterValuesType, TasksStateType, TodolistType} from "./app/App";
import {RootState} from "./app/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./model/task-reducer";
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./model/todolists-reducer";
import {Todolist} from "./Todolist";

const tasks = useSelector<RootState, TasksStateType>(state => state.tasks)
const todolists = useSelector<RootState, TodolistType[]>(state => state.todolists)
const dispatch = useDispatch()


const removeTodolist = (todolistId: string) => {
    dispatch(removeTodolistAC(todolistId))
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

export const Todolists = () => {
    return (
        <>
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
                    <Grid key={tl.id}>
                        <Paper sx={{p: '0 20px 20px 20px'}}>
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
            })
            }
        </>
    )
}
