import { ChangeEvent, useState } from "react"

type Props = {
  oldTitle: string
  changeItem?: (newTitle: string) => void
}
export const EditableSpan = ({ oldTitle, changeItem }: Props) => {
  const [editMod, setEditMode] = useState(false)
  const [newTitle, setNewTitle] = useState(oldTitle)

  const activateEditMode = () => {
    setEditMode(!editMod)
    if (editMod && newTitle.trim()) {
      if (changeItem) {
        changeItem(newTitle.trim())
      }
    }
  }

  const changeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.currentTarget.value)
  }

  return editMod ? (
    <input value={newTitle} onBlur={activateEditMode} autoFocus onChange={changeTitleHandler} />
  ) : (
    <span onDoubleClick={activateEditMode}>{oldTitle}</span>
  )
}
