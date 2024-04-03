import {FilterValuesType} from "./App";
import {useState} from "react";


type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: number) => void
}

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export const TodoList = (
    {
        title,
        tasks,
        removeTask,
    }: TodoListPropsType) => {


    const [filter, setFilter] = useState<FilterValuesType>("all")

    const getTasksForTodoList = (allTasks: Array<TaskType>, nextFilterValue: FilterValuesType) => {
        switch (nextFilterValue) {
            case "active":
                return allTasks.filter(t  => !t.isDone);
            case "completed":
                return allTasks.filter(t  => t.isDone);
            default:
                return allTasks;
        }
    }

    const tasksForTodoList = getTasksForTodoList(tasks, filter)

    const tasksList: Array<JSX.Element> = tasksForTodoList.map(task => {
        const removeTaskHandler = () => removeTask(task.id)
        return (
            <li>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <button onClick={removeTaskHandler}>X</button>
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
                <button onClick={() => setFilter("all")}>All</button>
                <button onClick={() => setFilter("active")}>Active</button>
                <button onClick={() => setFilter("completed")}>Completed</button>
            </div>
        </div>
    )
}