import { addTodolist, DomainTodolist, todolistsReducer } from "../todolistsSlice"
import { tasksReducer, TasksStateType } from "../taskSlice"

test("ids should be equals", () => {
  const startTasksState: TasksStateType = {}
  const startTodolistsState: DomainTodolist[] = []

  const todolist: DomainTodolist = {
    title: "new todolist",
    id: "any id",
    addedDate: "",
    order: 0,
    filter: "all",
    entityStatus: "idle"
  }

  const action = addTodolist({ todolist })

  const endTasksState = tasksReducer(startTasksState, action)
  const endTodolistsState = todolistsReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState)
  const idFromTasks = keys[0]
  const idFromTodolists = endTodolistsState[0].id

  expect(idFromTasks).toBe(action.payload.todolist.id)
  expect(idFromTodolists).toBe(action.payload.todolist.id)
})
