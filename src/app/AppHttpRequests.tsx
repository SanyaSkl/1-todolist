import Checkbox from "@mui/material/Checkbox"
import { AddItemForm } from "common/components"
import { EditableSpan } from "common/components/EditableSpan/EditableSpan"
import { TaskStatus } from "common/enums/enums"
import React, { useEffect, useState } from "react"
import { tasksApi } from "../features/todolists/api/tasksApi"
import { DomainTask, UpdateTaskModel } from "../features/todolists/api/tasksApi.types"
import { todolistsApi } from "../features/todolists/api/todolistsApi"
import { Todolist } from "../features/todolists/api/todolistsApi.types"

export const AppHttpRequests = () => {
  const [todolists, setTodolists] = useState<Todolist[]>([])
  const [tasks, setTasks] = useState<{ [key: string]: DomainTask[] }>({})

  useEffect(() => {
    todolistsApi.getTodolistApi().then((res) => {
      const todolists = res.data
      setTodolists(todolists)
      todolists.forEach((tl) => {
        tasksApi.getTaskApi(tl.id).then((res) => {
          setTasks((prev) => ({ ...prev, [tl.id]: res.data.items }))
        })
      })
    })
  }, [])

  const createTodolistHandler = (title: string) => {
    todolistsApi.createTodolist(title).then((res) => {
      const newTodolist = res.data.data.item
      setTodolists([newTodolist, ...todolists])
    })
  }

  const removeTodolistHandler = (id: string) => {
    todolistsApi.removeTodolist(id).then(() => {
      setTodolists(todolists.filter((tl) => tl.id !== id))
    })
  }

  const updateTodolistHandler = (id: string, title: string) => {
    todolistsApi.updateTodolist({ id, title }).then(() => {
      setTodolists(todolists.map((tl) => (tl.id === id ? { ...tl, title } : tl)))
    })
  }

  const createTaskHandler = (title: string, todolistId: string) => {
    tasksApi.createTask({ title, todolistId }).then((res) => {
      const newTask = res.data.data.item
      setTasks({ ...tasks, [todolistId]: [newTask, ...(tasks[todolistId] || [])] })
    })
  }

  const removeTaskHandler = (taskId: string, todolistId: string) => {
    tasksApi.removeTask({ taskId, todolistId }).then(() => {
      setTasks({ ...tasks, [todolistId]: tasks[todolistId].filter((t) => t.id !== taskId) })
    })
  }

  const changeTaskStatusHandler = (e: React.ChangeEvent<HTMLInputElement>, task: DomainTask) => {
    let status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New

    const model: UpdateTaskModel = {
      description: task.description,
      title: task.title,
      status,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
    }

    tasksApi.updateTaskStatus({ taskId: task.id, todolistId: task.todoListId, model }).then(() => {
      const newTasks = tasks[task.todoListId].map((t) => (t.id === task.id ? { ...t, ...model } : t))
      console.log(newTasks)
      setTasks({ ...tasks, [task.todoListId]: newTasks })
    })
  }

  const changeTaskTitleHandler = (taskId: string, title: string, todolistId: string) => {
    tasksApi.updateTaskTitle({ taskId, title, todolistId }).then(() => {
      setTasks({ ...tasks, [todolistId]: tasks[todolistId].map((t) => (t.id === taskId ? { ...t, title } : t)) })
    })
  }

  return (
    <div style={{ margin: "20px" }}>
      <AddItemForm addItem={createTodolistHandler} />

      {/* Todolists */}
      {todolists.map((tl) => {
        return (
          <div key={tl.id} style={todolist}>
            <div>
              <EditableSpan oldTitle={tl.title} changeItem={(title: string) => updateTodolistHandler(tl.id, title)} />
              <button onClick={() => removeTodolistHandler(tl.id)}>x</button>
            </div>
            <AddItemForm addItem={(title) => createTaskHandler(title, tl.id)} />

            {/* Tasks */}
            {!!tasks[tl.id] &&
              tasks[tl.id].map((task: DomainTask) => {
                return (
                  <div key={task.id}>
                    <Checkbox checked={task.status === 2} onChange={(e) => changeTaskStatusHandler(e, task)} />
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
  border: "1px solid black",
  margin: "20px 0",
  padding: "10px",
  width: "300px",
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
}
