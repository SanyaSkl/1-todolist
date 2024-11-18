import {TasksStateType} from '../App'

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.payload.todolistId]
            stateCopy[action.payload.todolistId] = tasks.filter(t => t.id !== action.payload.taskId)
            return stateCopy
        }

        default:
            throw new Error("I don't understand this type")
    }
}

// Action creators
export const removeTaskAC = (taskId: string, todolistId: string) => {
    return { type: 'REMOVE-TASK', payload: {taskId, todolistId} } as const
}

// Actions types
export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>

type ActionsType = RemoveTaskActionType