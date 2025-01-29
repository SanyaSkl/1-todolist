import Checkbox from '@mui/material/Checkbox'
import axios from "axios";
import React, {ChangeEvent, useEffect, useState} from 'react'
import {AddItemForm} from '../common/components/AddItemForm/AddItemForm'
import {EditableSpan} from '../common/components/EditableSpan/EditableSpan'

export type Todolist = {
    id: string,
    title: string,
    addedDate: string,
    order: number
}

export type Task = {
    description: string
    title: string
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type GetTaskResponse = {
    items: Task[]
    totalCount: number
    error: string | null
}

export type Response<T = {}> = {
    resultCode: number
    messages: string[]
    fieldsErrors: string[]
    data: T
}

export type UpdateTaskModel = {
    description: string
    title: string
    status: number
    priority: number
    startDate: string
    deadline: string
}

export const AppHttpRequests = () => {
    const [todolists, setTodolists] = useState<Todolist[]>([])
    const [tasks, setTasks] = useState<{ [key: string]: Task[] }>({})

    useEffect(() => {
        axios.get<Todolist[]>('https://social-network.samuraijs.com/api/1.1/todo-lists', {
            headers: {
                Authorization: 'Bearer *************************************',
            }
        }).then(res => {
            const todolists = res.data
            setTodolists(todolists)
            todolists.forEach(tl => {
                axios.get<GetTaskResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${tl.id}/tasks`, {
                    headers: {
                        Authorization: 'Bearer *************************************',
                        'API-KEY': '*************************************',
                    }
                }).then(res => {
                    setTasks(prev => ({...prev, [tl.id]: res.data.items}))
                })
            })
        })
    }, [])

    const createTodolistHandler = (title: string) => {
        axios.post<Response<{ item: Todolist }>>('https://social-network.samuraijs.com/api/1.1/todo-lists',
            {title}, {
                headers: {
                    Authorization: 'Bearer *************************************',
                    'API-KEY': '*************************************',
                },
            }).then(res => {
            const newTodolist = res.data.data.item
            setTodolists([newTodolist, ...todolists])
        })
    }

    const removeTodolistHandler = (id: string) => {
        axios.delete<Response>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, {
            headers: {
                Authorization: 'Bearer *************************************',
                'API-KEY': '*************************************',
            },
        }).then(() => {
            setTodolists(todolists.filter(tl => tl.id !== id))
        })
    }

    const updateTodolistHandler = (id: string, title: string) => {
        axios.put<Response>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`,
            {title}, {
                headers: {
                    Authorization: 'Bearer *************************************',
                    'API-KEY': '*************************************',
                },
            }).then(() => {
            setTodolists(todolists.map(tl => tl.id === id ? {...tl, title} : tl))
        })
    }

    const createTaskHandler = (title: string, todolistId: string) => {
        axios.post<Response<{ item: Task }>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks`,
            {title}, {
                headers: {
                    Authorization: 'Bearer *************************************',
                    'API-KEY': '*************************************',
                },
            }).then(res => {
            const newTask = res.data.data.item
            setTasks({...tasks, [todolistId]: [newTask, ...(tasks[todolistId] || [])]})
        })
    }

    const removeTaskHandler = (taskId: string, todolistId: string) => {
        axios.delete<Response>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks/${taskId}`, {
            headers: {
                Authorization: 'Bearer *************************************',
                'API-KEY': '*************************************',
            },
        }).then(() => {
            setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)})
        })
    }

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>, task: Task, todolistId: string) => {
        const model: UpdateTaskModel = {
            description: task.description,
            title: task.title,
            status: e.currentTarget.checked ? 2 : 0,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline
        }

        axios.put<Response<{ item: Task }>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks/${task.id}`,
            model, {
                headers: {
                    Authorization: 'Bearer *************************************',
                    'API-KEY': '*************************************',
                },
            }).then(res => {
            const newTask = res.data.data.item
            setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === task.id ? newTask : t)})
        })
    }

    const changeTaskTitleHandler = (taskId: string, title: string, todolistId: string) => {
        axios.put<Response<{ item: Task }>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks/${taskId}`,
            {title}, {
                headers: {
                    Authorization: 'Bearer *************************************',
                    'API-KEY': '*************************************',
                },
            }).then(() => {
            setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, title} : t)})
        })
    }

    return (
        <div style={{margin: '20px'}}>
            <AddItemForm addItem={createTodolistHandler}/>

            {/* Todolists */}
            {todolists.map(tl => {
                return (
                    <div key={tl.id} style={todolist}>
                        <div>
                            <EditableSpan
                                oldTitle={tl.title}
                                changeItem={(title: string) => updateTodolistHandler(tl.id, title)}
                            />
                            <button onClick={() => removeTodolistHandler(tl.id)}>x</button>
                        </div>
                        <AddItemForm addItem={title => createTaskHandler(title, tl.id)}/>

                        {/* Tasks */}
                        {!!tasks[tl.id] &&
                            tasks[tl.id].map((task: Task) => {
                                return (
                                    <div key={task.id}>
                                        <Checkbox
                                            checked={task.status === 2}
                                            onChange={e => changeTaskStatusHandler(e, task, tl.id)}
                                        />
                                        <EditableSpan
                                            oldTitle={task.title}
                                            changeItem={(title: string) => changeTaskTitleHandler(task.id, title, tl.id)}
                                        />
                                        <button onClick={() => removeTaskHandler(task.id, tl.id)}>x</button>
                                    </div>
                                )
                            })}
                    </div>
                )
            })}
        </div>
    )
}

// Styles
const todolist: React.CSSProperties = {
    border: '1px solid black',
    margin: '20px 0',
    padding: '10px',
    width: '300px',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
}