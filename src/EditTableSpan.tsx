import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";

type EditTableSpanPropsType = {
    title: string
    onChange: (newValue: string) => void
}

export const EditTableSpan = React.memo( (props: EditTableSpanPropsType) => {
    console.log("Editable span is called")
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
        ? <TextField value={title} onChange={onChangeTitleHandler} onBlur={activateViewMode} autoFocus/>
        : <span onDoubleClick={activateEditMode}>{props.title}</span>
})