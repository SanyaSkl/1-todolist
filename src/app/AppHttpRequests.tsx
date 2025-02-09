import Checkbox from '@mui/material/Checkbox'
import axios from 'axios';
import React, {ChangeEvent, useEffect, useState} from 'react'
import {AddItemForm} from '../common/components/AddItemForm/AddItemForm'
import {EditableSpan} from '../common/components/EditableSpan/EditableSpan'
import {GetTaskResponse, Task, UpdateTaskModel} from '../features/todolists/api/tasksApi.types';
import {todolistsApi} from '../features/todolists/api/todolistsApi';
import {Response, Todolist} from '../features/todolists/api/todolistsApi.types';


export const AppHttpRequests = () => {
    const [todolists, setTodolists] = useState<Todolist[]>([])
    const [tasks, setTasks] = useState<{ [key: string]: Task[] }>({})

    useEffect(() => {
        todolistsApi.getTodolistApi().then(res => {
            const todolists = res.data
            setTodolists(todolists)
            todolists.forEach(tl => {
                axios.get<GetTaskResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${tl.id}/tasks`, {
                    headers: {
                        Authorization: 'Bearer 58249b0a-b8fd-46ff-aedb-3ed66a90a743',
                        'API-KEY': '1f899b25-ea32-4422-868d-0e025508e3bf',
                    }
                }).then(res => {
                    setTasks(prev => ({...prev, [tl.id]: res.data.items}))
                })
            })
        })
    }, [])

    const createTodolistHandler = (title: string) => {
        todolistsApi.createTodolist(title).then(res => {
            const newTodolist = res.data.data.item
            setTodolists([newTodolist, ...todolists])
        })
    }

    const removeTodolistHandler = (id: string) => {
        todolistsApi.removeTodolist(id).then(() => {
            setTodolists(todolists.filter(tl => tl.id !== id))
        })
    }

    const updateTodolistHandler = (id: string, title: string) => {
        todolistsApi.updateTodolist({id, title}).then(() => {
            setTodolists(todolists.map(tl => tl.id === id ? {...tl, title} : tl))
        })
    }

    const createTaskHandler = (title: string, todolistId: string) => {
        axios.post<Response<{ item: Task }>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks`,
            {title}, {
                headers: {
                    Authorization: 'Bearer 58249b0a-b8fd-46ff-aedb-3ed66a90a743',
                    'API-KEY': '1f899b25-ea32-4422-868d-0e025508e3bf',
                },
            }).then(res => {
            const newTask = res.data.data.item
            setTasks({...tasks, [todolistId]: [newTask, ...(tasks[todolistId] || [])]})
        })
    }

    const removeTaskHandler = (taskId: string, todolistId: string) => {
        axios.delete<Response>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks/${taskId}`, {
            headers: {
                Authorization: 'Bearer 58249b0a-b8fd-46ff-aedb-3ed66a90a743',
                'API-KEY': '1f899b25-ea32-4422-868d-0e025508e3bf',
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
                    Authorization: 'Bearer 58249b0a-b8fd-46ff-aedb-3ed66a90a743',
                    'API-KEY': '1f899b25-ea32-4422-868d-0e025508e3bf',
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
                    Authorization: 'Bearer 58249b0a-b8fd-46ff-aedb-3ed66a90a743',
                    'API-KEY': '1f899b25-ea32-4422-868d-0e025508e3bf',
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