import {Container} from "@mui/material";
import Grid from "@mui/material/Grid2";
import React from 'react';
import {useDispatch} from "react-redux";
import {AddItemForm} from "./AddItemForm";
import {addTodolistAC} from "./model/todolists-reducer";
import {Todolists} from "./Todolists";

export const Main = () => {

    const dispatch = useDispatch()

    const addTodolist = (title: string) => {
        dispatch(addTodolistAC(title))
    }

    return (
        <Container fixed>
            <Grid container sx={{mb: '30px'}}>
                <AddItemForm addItem={addTodolist}/>
            </Grid>
            <Grid container spacing={4}>
                <Todolists/>
            </Grid>
        </Container>
    )
}