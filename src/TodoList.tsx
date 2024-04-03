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

export const TodoList = ({title, tasks, removeTask}: TodoListPropsType) => {

    const tasksList: Array<JSX.Element> = tasks.map(task => {
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
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}