import List from "@mui/material/List";
import React from 'react';
import {TodolistType} from "../../../../../../app/App";
import {useAppSelector} from "../../../../../../common/hooks/useAppSelector";
import {selectTasks} from "../../../../model/tasksSelectors";
import {Task} from "../Task/Task";

type Props = {
    todolist: TodolistType
}

export const Tasks = ({todolist}: Props) => {

    const tasks = useAppSelector(selectTasks)
    const allTasks = tasks[todolist.id]

    let tasksForTodolist = allTasks

    if (todolist.filter === 'active') {
        tasksForTodolist = allTasks.filter(task => !task.isDone)
    }
    if (todolist.filter === 'completed') {
        tasksForTodolist = allTasks.filter(task => task.isDone)
    }

    return (
        <>
            {
                tasksForTodolist.length === 0
                    ? <p>Тасок нет</p>
                    : <List>
                        {tasksForTodolist.map((task) =>
                            <Task key={task.id}
                                  task={task}
                                  todolist={todolist}
                            />)}
                    </List>
            }
        </>
    )
}