import {FilterValuesType, TaskType} from "./App";
import {ChangeEvent} from "react";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox'
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Box from "@mui/material/Box";
import {filterButtonContainerSx, getListItemSx} from "./Todolist.styles";


type PropsType = {
    title: string
    todolistId: string
    tasks: TaskType[]
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (filter: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, taskStatus: boolean, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, newTitle: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
}

export const Todolist = (props: PropsType) => {
    const {
        title,
        tasks,
        filter,
        removeTask,
        changeFilter,
        addTask,
        changeTaskStatus,
        todolistId,
        removeTodolist,
        changeTaskTitle,
        changeTodolistTitle
    } = props


    const changeFilterTasksHandler = (filter: FilterValuesType) => {
        changeFilter(filter, props.todolistId)
    }

    const removeTodolistHandler = () => {
        removeTodolist(todolistId)
    }

    const addTaskHandler = (title: string) => {
        addTask(title, todolistId)
    }

    const changeTodolistTitleHandler = (newTitle: string) => {
        changeTodolistTitle(todolistId, newTitle)
    }

    const changeTaskTitleHandler = (taskId: string, newTitle: string) => {
        changeTaskTitle(todolistId, taskId, newTitle)
    }

    return (
        <div>
            <div className={"todolist-title-container"}>

                <EditableSpan oldTitle={title} changeItem={changeTodolistTitleHandler}/>
                <IconButton aria-label="delete" onClick={removeTodolistHandler}>
                    <DeleteIcon/>
                </IconButton>
            </div>
            <AddItemForm addItem={addTaskHandler}/>
            {
                tasks.length === 0
                    ? <p>Тасок нет</p>
                    : <List>
                        {tasks.map((task) => {

                            const removeTaskHandler = () => {
                                removeTask(task.id, todolistId)
                            }

                            const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                const newStatusValue = e.currentTarget.checked
                                changeTaskStatus(task.id, newStatusValue, todolistId)
                            }

                            return (
                                <ListItem
                                    key={task.id}
                                    sx={getListItemSx(task.isDone)}
                                >
                                    <div>
                                        <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler}/>
                                        <EditableSpan oldTitle={task.title}
                                                      changeItem={(newTitle) => changeTaskTitleHandler(task.id, newTitle)}/>
                                    </div>
                                    <IconButton aria-label="delete" size="small" onClick={removeTaskHandler}>
                                        <DeleteIcon fontSize="inherit"/>
                                    </IconButton>
                                </ListItem>
                            )
                        })}
                    </List>
            }
            <div>
                <Box sx={filterButtonContainerSx}>
                    <Button variant={filter === "all" ? "outlined" : "contained"} color="secondary"
                            onClick={() => changeFilterTasksHandler('all')}>
                        All
                    </Button>
                    <Button variant={filter === "active" ? "outlined" : "contained"} color="primary"
                            onClick={() => changeFilterTasksHandler('active')}>
                        Active
                    </Button>
                    <Button variant={filter === "completed" ? "outlined" : "contained"} color="error"
                            onClick={() => changeFilterTasksHandler('completed')}>
                        Completed
                    </Button>
                </Box>
            </div>
        </div>
    )
}
