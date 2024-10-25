import {FilterValuesType, TaskType} from "./App";
import {ChangeEvent} from "react";
//import {Button} from "./Button";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox'
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';


type PropsType = {
	title: string
	todolistId: string
	tasks: TaskType[]
	removeTask: (taskId: string, todolistId: string) => void
	changeFilter: (filter: FilterValuesType, todolistId: string) => void
	addTask: (title: string, todolistId: string) => void
	changeTaskStatus: (taskId: string, taskStatus: boolean, todolistId: string) => void
	filter: FilterValuesType
	removeTodolist: (todolistId: string) => void
	changeTaskTitle: (todolistId: string, taskId: string, newTitle: string) => void
	changeTodolistTitle: (todolistId: string, title: string) => void
}

export const Todolist = (props: PropsType) => {
	const {
		title,
		tasks,
		filter,
		removeTask,
		changeFilter,
		addTask,
		changeTaskStatus,
		todolistId,
		removeTodolist,
		changeTaskTitle,
		changeTodolistTitle
	} = props


	const changeFilterTasksHandler = (filter: FilterValuesType) => {
		changeFilter(filter, props.todolistId)
	}

	const removeTodolistHandler = () => {
		removeTodolist(todolistId)
	}

	const addTaskHandler=(title: string)=> {
		addTask(title, todolistId)
	}

	const changeTodolistTitleHandler = (newTitle:string) => {
		changeTodolistTitle(todolistId, newTitle)
	}

	const changeTaskTitleHandler = (taskId: string,newTitle:string) => {
		changeTaskTitle(todolistId, taskId, newTitle)
	}

	return (
		<div>
			<div className={"todolist-title-container"}>

				<EditableSpan oldTitle={title} changeItem={changeTodolistTitleHandler}/>

				{/*<h3>{title}</h3>*/}
				<IconButton aria-label="delete" onClick={removeTodolistHandler}>
					<DeleteIcon />
				</IconButton>
				{/*<Button title={'x'} onClick={removeTodolistHandler}/>*/}
			</div>
			<AddItemForm addItem={addTaskHandler} />
			{
				tasks.length === 0
					? <p>Тасок нет</p>
					: <List>
						{tasks.map((task) => {

							const removeTaskHandler = () => {
								removeTask(task.id, todolistId)
							}

							const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
								const newStatusValue = e.currentTarget.checked
								changeTaskStatus(task.id, newStatusValue, todolistId)
							}

							// const changeTaskTitleHandler = (newTitle:string) => {
							// 	changeTaskTitle(todolistId, task.id, newTitle)
							// }

							return <ListItem key={task.id} className={task.isDone ? 'is-done' : ''}>
								<Checkbox checked={task.isDone} onChange={changeTaskStatusHandler}/>
								{/*<input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler}/>*/}

								<EditableSpan oldTitle={task.title} changeItem={(newTitle)=>changeTaskTitleHandler(task.id, newTitle)}/>

								<IconButton aria-label="delete" size="small" onClick={removeTaskHandler}>
									<DeleteIcon fontSize="inherit" />
								</IconButton>

								{/*<Button onClick={removeTaskHandler} title={'x'}/>*/}
							</ListItem>
						})}
					</List>
			}
			<div>
				<Button variant={ filter === "all" ? "outlined" : "contained"} color="secondary"
						onClick={() => changeFilterTasksHandler('all')}>
					All
				</Button>
				<Button variant={ filter === "active" ? "outlined" : "contained"} color="primary"
						onClick={() => changeFilterTasksHandler('active')}>
					Active
				</Button>
				<Button variant={ filter === "completed" ? "outlined" : "contained"} color="error"
						onClick={() => changeFilterTasksHandler('completed')}>
					Completed
				</Button>

				{/*<Button className={filter === 'all' ? 'active-filter' : ''} title={'All'}*/}
				{/*        onClick={() => changeFilterTasksHandler('all')}/>*/}
				{/*<Button className={filter === 'active' ? 'active-filter' : ''} title={'Active'}*/}
				{/*        onClick={() => changeFilterTasksHandler('active')}/>*/}
				{/*<Button className={filter === 'completed' ? 'active-filter' : ''} title={'Completed'}*/}
				{/*        onClick={() => changeFilterTasksHandler('completed')}/>*/}
			</div>
		</div>
	)
}
