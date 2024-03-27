import React from 'react';
import './App.css';
import {TodoList} from "./TodoList";

function App() {
    const todoListTitle_1 = "What to learn"
    const todoListTitle_2 = "What to buy"

    const tasks_1 = [
        {id: 1, title: "HTML & CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false}
]

    const tasks_2 = [
        {id: 1, title: "Ice cream", isDone: false},
        {id: 2, title: "Milk", isDone: true},
        {id: 3, title: "Chocolate", isDone: true}
    ]
    return (
        <div className="App">
            <TodoList title={todoListTitle_1} tasks={tasks_1}/>
            <TodoList title={todoListTitle_2} tasks={tasks_2}/>
        </div>
    );
}

export default App;
