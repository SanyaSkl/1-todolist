import React from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";

function App() {
    const todoListTitle_1 = "What to learn"
    const todoListTitle_2 = "What to buy"
    const tasks_1: Array<TaskType> = [
        {id: 1, title: "HTML & CSS", isDone: true},
        {id: 2, title: "JS & TS", isDone: true},
        {id: 3, title: "React", isDone: false}
    ]
    const tasks_2: Array<TaskType> = [
        {id: 1, title: "ice cream", isDone: true},
        {id: 2, title: "Milk", isDone: true},
        {id: 3, title: "Chocolate", isDone: true},
        {id: 4, title: "Coca-Cola", isDone: true},
        {id: 5, title: "Pepsi", isDone: false},
    ]

    return (
        <div className="App">
            <TodoList title={todoListTitle_1} tasks={tasks_1}/>
            <TodoList title={todoListTitle_2} tasks={tasks_2}/>
        </div>
    )
}

export default App;
