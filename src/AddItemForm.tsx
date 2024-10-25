//import {Button} from "./Button";
import Button from '@mui/material/Button';
import {ChangeEvent, KeyboardEvent, useState} from "react";
import TextField from '@mui/material/TextField'

type Props = {
    addItem:(title: string)=>void
};
export const AddItemForm = ({addItem}: Props) => {
    const [taskTitle, setTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)


    const addItemHandler = () => {
        if (taskTitle.trim() !== '') {
            addItem(taskTitle.trim())
            setTaskTitle('')
        } else {
            setError('Title is required')
        }
    }

    const changeItemTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value)
    }

    const addTaskOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === 'Enter') {
            addItemHandler()
        }
    }

    const buttonStyle = {
        maxWidth: '39px',
        maxHeight: '39px',
        minWidth: '39px',
        minHeight: '39px'
    }

    return (
        <div>
            <TextField
                error={!!error}
                id="outlined-basic"
                label={error ? error : 'type smth. please)'}
                variant="outlined"
                className={error ? 'error' : ''}
                value={taskTitle}
                onChange={changeItemTitleHandler}
                onKeyUp={addTaskOnKeyUpHandler}
                size="small"
            />
            {/*<input*/}
            {/*    className={error ? 'error' : ''}*/}
            {/*    value={taskTitle}*/}
            {/*    onChange={changeItemTitleHandler}*/}
            {/*    onKeyUp={addTaskOnKeyUpHandler}*/}
            {/*/>*/}
            <Button variant="contained" onClick={addItemHandler} size="small" style={buttonStyle}>+</Button>
            {/*<Button title={'+'} onClick={addItemHandler}/>*/}
            {/*{error && <div className={'error-message'}>{error}</div>}*/}
        </div>
    );
};