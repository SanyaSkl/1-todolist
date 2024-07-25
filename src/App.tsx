import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";

export type FilterValuesType = "all" | "active" | "completed";
type TodolistsType = {
    id: string,
    title: string
}
type TasksType = {

    [key: string]: ItemType
}

type ItemType = {
    data: TaskType[]
    filter: FilterValuesType
}

function App() {
    // let todolistID1 = v1();
    // let todolistID2 = v1();
    //
    // let [todolists, setTodolists] = useState<Array<TodolistsType>>([
    //     {id: todolistID1, title: 'What to learn', filter: 'all'}, //0
    //      {id: todolistID2, title: 'What to buy', filter: 'all'},  //1
    // ])
    //
    // let [tasks, setTasks] = useState({
    //     [todolistID1]: [
    //         {id: v1(), title: "HTML&CSS", isDone: true},
    //         {id: v1(), title: "JS", isDone: true},
    //         {id: v1(), title: "ReactJS", isDone: false},
    //         {id: v1(), title: "Rest API", isDone: false},
    //         {id: v1(), title: "GraphQL", isDone: false},
    //     ],
    //     [todolistID2]: [
    //         {id: v1(), title: "HTML&CSS2", isDone: true},
    //         {id: v1(), title: "JS2", isDone: true},
    //         {id: v1(), title: "ReactJS2", isDone: false},
    //         {id: v1(), title: "Rest API2", isDone: false},
    //         {id: v1(), title: "GraphQL2", isDone: false},
    //     ]
    // });

    const todolistId1 = v1();
    const todolistId2 = v1();

    const [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistId1, title: "What to learn"},
        {id: todolistId2, title: "What to buy"}
    ])

    const [tasks, setTasks] = useState<TasksType>({
        [todolistId1]: {
            data: [
                {id: v1(), title: "HTML&CSS1111", isDone: true},
                {id: v1(), title: "JS1111", isDone: true}
            ],
            filter: "all"
        },
        [todolistId2]: {
            data: [
                {id: v1(), title: "HTML&CSS22222", isDone: true},
                {id: v1(), title: "JS2222", isDone: true}
            ],
            filter: "all"
        }
    });


    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(el => el.id !== todolistId))
        delete tasks[todolistId]
        console.log(tasks)
    }

    const removeTask = (todolistId: string, taskId: string) => {
        setTasks({
                ...tasks,
                [todolistId]: {
                    ...tasks[todolistId],
                    data: tasks[todolistId].data.filter(el => el.id !== taskId)
                }
            }
        )
    }

    const addTask = (todolistId: string, title: string) => {
        let newTask = {id: v1(), title: title, isDone: false};
        setTasks({...tasks, [todolistId]: {...tasks[todolistId], data: [...tasks[todolistId].data, newTask]}})
    }

    const changeStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        setTasks({
            ...tasks, [todolistId]: {
                ...tasks[todolistId],
                data: tasks[todolistId].data.map(el => el.id === taskId ? {...el, isDone} : el)
            }
        })
        //setTasks({
        //...tasks,
        //[todolistId]: tasks[todolistId].map(el => el.id === taskId ? {...el, isDone: newIsDone} : el)
    }
    const changeFilter = (todolistId: string, filter: FilterValuesType) => {
        setTasks({...tasks, [todolistId]: {...tasks[todolistId], filter}})
    }

    const addTodolist = () => {

    }

    return (
        <div className="App">
            <AddItemForm todolistId={'todolistId'} addItem={addTodolist}/>
            {todolists.map((el) => {
                let tasksForTodolist = tasks[el.id].data;

                return (
                    <Todolist
                        key={el.id}
                        todolistId={el.id}
                        title={el.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={tasks[el.id].filter}
                        removeTodolist={removeTodolist}
                    />
                )
            })}
        </div>
    );
}

export default App;
