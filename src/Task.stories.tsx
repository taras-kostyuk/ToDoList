import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import {action} from "@storybook/addon-actions";
import {Task, TaskPropsType} from "./Task";
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";


export default {
    title: 'Todolists/AddItemForm',
    component: Task,
    decorators:[ReduxStoreProviderDecorator],
    args: {
        todolistId:'qwerty'
    }
} as Meta;

const changeTaskStatusCallback = action("Status Changed inside Tasks ")
const changeTaskTitleCallback = action("Title changed inside Task  ")
const  removeTaskCallback = action("Remove Button inside Task clicked ")

const Template: Story<TaskPropsType> = (args) => <Task {...args} />;

const basedArg = {
    changeTaskStatus: changeTaskStatusCallback,
    changeTaskTitle: changeTaskTitleCallback,
    removeTas: removeTaskCallback
}

export const TaskIsDoneExample = Template.bind({});
TaskIsDoneExample.args = {
    ...basedArg,
    task:{id: "1", isDone: true, title: "JS"},

};

export const TaskIsNotDoneExample = Template.bind({});
TaskIsNotDoneExample.args = {
    ...basedArg,
    task:{id: "1", isDone: false, title: "JS"},

};