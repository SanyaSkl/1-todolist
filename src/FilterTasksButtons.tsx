import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import React from 'react';
import {useDispatch} from "react-redux";
import {FilterValuesType} from "./app/App";
import {changeTodolistFilterAC} from "./model/todolists-reducer";
import {filterButtonContainerSx} from "./Todolist.styles";

type Props = {
    id: string
    filter: FilterValuesType
}

export const FilterTasksButtons = ({id, filter}: Props) => {
    const dispatch = useDispatch()

    const changeFilterTasksHandler = (filter: FilterValuesType) => {
        dispatch(changeTodolistFilterAC({id, filter}))
    }

    return (
        <>
            <Box sx={filterButtonContainerSx}>
                <Button variant={filter === "all" ? "outlined" : "contained"}
                        color="secondary"
                        onClick={() => changeFilterTasksHandler('all')}>
                    All
                </Button>
                <Button variant={filter === "active" ? "outlined" : "contained"}
                        color="primary"
                        onClick={() => changeFilterTasksHandler('active')}>
                    Active
                </Button>
                <Button variant={filter === "completed" ? "outlined" : "contained"}
                        color="error"
                        onClick={() => changeFilterTasksHandler('completed')}>
                    Completed
                </Button>
            </Box>
        </>
    )
}
