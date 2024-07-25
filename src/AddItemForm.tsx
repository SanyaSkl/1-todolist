import {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button} from "./Button";

type Props = {
    addItem: (title: string, todolistId: string) => void
    todolistId: string
};

export const AddItemForm = ({addItem, todolistId}: Props) => {
    const [title, setTitle] = useState("")
    const [error, setError] = useState<string | null>(null)

    const addItemHandler = () => {
        if (title.trim() !== "") {
            addItem(title.trim(), todolistId);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.key === 'Enter') {
            addItemHandler();
        }
    }

    return (
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyUp={onKeyPressHandler}
                   className={error ? "error" : ""}
            />
            <Button onClick={addItemHandler} title={'+'}/>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};