import {v1} from "uuid";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "../todolists-reducer";
import {TodolistType} from "../../../../app/App";
let todolistId1: string
let todolistId2: string
let startState: TodolistType[] = []

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()

    startState = [
        { id: todolistId1, title: 'What to learn', filter: 'all' },
        { id: todolistId2, title: 'What to buy', filter: 'all' },
    ]
})

test('correct todolist should be removed', () => {

    //1. Стартовый state

    //2. Действие
    /*const action = {
        type: 'REMOVE-TODOLIST',
        payload: {
            id: todolistId1,
        },
    } as const*/

    // const endState = todolistReducer(startState, action)

    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))

    //3. Проверяем, что наши действия (изменение state) соответствуют ожиданию
    // в масиве останется один тудулист, а не любой
    expect(endState.length).toBe(1)
    // удалится нужный тудулист, а не любой
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {

    const endState = todolistsReducer(startState, addTodolistAC('New Todolist'))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe('New Todolist')
})

test('correct todolist should change its name', () => {

    // const action = {
    //     type: 'CHANGE-TODOLIST-TITLE',
    //     payload: {
    //         id: todolistId2,
    //         title: 'New Todolist',
    //     },
    // } as const

    const endState = todolistsReducer(startState, changeTodolistTitleAC({
        id: todolistId2,
        title: 'New Todolist'
    }))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe('New Todolist')
})

test('correct filter of todolist should be changed', () => {

    // const action = {
    //     type: 'CHANGE-TODOLIST-FILTER',
    //     payload: {
    //         id: todolistId2,
    //         filter: 'completed',
    //     },
    // } as const

    const endState = todolistsReducer(startState, changeTodolistFilterAC({
        id: todolistId2,
        filter: 'completed'
    }))

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe('completed')
})