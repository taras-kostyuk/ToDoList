import React, {ChangeEvent, useState} from "react";

type EditTableSpanPropsType = {
    title: string
    onChange: (newValue: string) => void
}

export function EditTableSpan(props: EditTableSpanPropsType) {
    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState("")

    const activateEditMode = () => {

        setEditMode(true)
        setTitle(props.title)
    }
    const activateViewMode = () => {


        setEditMode(false)


        props.onChange(title)
    }
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    return editMode
        ? <input value={title} onChange={onChangeTitleHandler} onBlur={activateViewMode} autoFocus/>
        : <span onDoubleClick={activateEditMode}>{props.title}</span>
}