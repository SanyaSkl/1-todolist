import Button from "@mui/material/Button"
import { ChangeEvent, KeyboardEvent, useState } from "react"
import TextField from "@mui/material/TextField"

type Props = {
  addItem: (title: string) => void
  disabled?: boolean
}
export const AddItemForm = ({ addItem, disabled }: Props) => {
  const [taskTitle, setTaskTitle] = useState("")
  const [error, setError] = useState<string | null>(null)

  const addItemHandler = () => {
    if (taskTitle.trim() !== "") {
      addItem(taskTitle.trim())
      setTaskTitle("")
    } else {
      setError("Title is required")
    }
  }

  const changeItemTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(event.currentTarget.value)
  }

  const addTaskOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    setError(null)
    if (event.key === "Enter") {
      addItemHandler()
    }
  }

  const buttonStyle = {
    maxWidth: "39px",
    maxHeight: "39px",
    minWidth: "39px",
    minHeight: "39px"
  }

  return (
    <div>
      <TextField
        error={!!error}
        id="outlined-basic"
        label={error ? error : "type smth. please)"}
        variant="outlined"
        className={error ? "error" : ""}
        value={taskTitle}
        onChange={changeItemTitleHandler}
        onKeyUp={addTaskOnKeyUpHandler}
        size="small"
        disabled={disabled}
      />
      <Button variant="contained" onClick={addItemHandler} size="small" style={buttonStyle} disabled={disabled}>
        +
      </Button>
    </div>
  )
}
