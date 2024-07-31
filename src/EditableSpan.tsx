import {useState} from "react";

type Props = {
    value: string
};
export const EditableSpan = ({value}: Props) => {
    const [editMod, setEditMode] = useState(false)
    const ActivateEditMode = () => {
        setEditMode(true)
    }
    return (
        editMod
            ? <input value={value}/>
            : <span onDoubleClick={ActivateEditMode}>{value}</span>
    );
};