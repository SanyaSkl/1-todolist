import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";


export type FilterValuesType = "all" | "active" | "completed"

function App() {
    const todoListTitle = "What to learn"

    const [tasks, setTasks] = useState([
        {id: v1(), title: "HTML & CSS", isDone: true},
        {id: v1(), title: "JS & TS", isDone: true},
        {id: v1(), title: "React", isDone: false}
    ])

    const removeTask = (taskId: string) => {
        const newState = tasks.filter(t => t.id !== taskId)
        setTasks(newState)
    }

    const addTask = (title: string) => {
        const newTask = {
            id: v1(),
            title,
            isDone: false
        }
        const newTasks = [newTask, ...tasks]
        setTasks(newTasks)

    }


    return (
        <div className="App">
            <TodoList
                title = {todoListTitle}
                tasks = {tasks}
                addTask={addTask}
                removeTask = {removeTask}
            />
        </div>
    )
}

export default App;
