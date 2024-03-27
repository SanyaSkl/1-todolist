import React from "react";

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
}

type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export const TodoList = ({title, tasks}: TodoListPropsType) => {
   /* const title = props.title
    const tasks = props.tasks*/

    //const {title, tasks} = props

    const tasksList: Array<JSX.Element> = tasks.map(task => {
        return (
            <li>
                <input type= "checkbox" checked={task.isDone} />
                <span>{task.title}</span>
            </li>
        )
    })

    return (
        <div className="todoList">
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {tasksList}
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}