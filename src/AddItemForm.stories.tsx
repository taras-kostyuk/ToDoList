import {AddItemForm, AddItemFormPropsType} from "./AddItemForm";
import React from "react";
import {action} from "@storybook/addon-actions";
import {Meta, Story} from "@storybook/react/types-6-0";

/*
export default  {
    title:"AddItemForm Component",
    component:AddItemForm
} as Meta
const Template: Story<AddItemFormPropsType> = (args) => <AddItemForm {...args} />;

const callback = action("Button add was pressed inside the form")
export const AddItemFormBaseExample =(props:any) => {
    return <AddItemForm addItem={callback}  />
}
*/


export default {
    title: 'AddItemForm Component',
    component: AddItemForm,
} as Meta;

const Template: Story<AddItemFormPropsType> = (args) => <AddItemForm {...args} />;

export const AddItemFormExample = Template.bind({});
AddItemFormExample.args = {
    addItem:action("Button inside clicked")
};

