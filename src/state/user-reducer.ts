type StateType = {
    age: number
    childrenCount: number
    name: string
}
type ActionType = {
    type: string
    [key: string]: any
}

export const userReducer = (state: StateType, action: ActionType) => {
    switch (action.type) {
        case'INCREMENT-AGE':
            let newState = {...state}
            newState.age = state.age + 1
            return newState
        case'INCREMENT-CHILDREN-COUNT':
            state.childrenCount = state.childrenCount + 1
            return state;
        case 'Change-Name':
            return {
                ...state,
                name:action.newName
            }
        default:
            throw new Error("I don't understand this action type ")
    }
}