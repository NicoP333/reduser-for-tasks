import {FilterValueType, TaskStateType, TodoListsType} from "../App";
import {v1} from "uuid";
import {AddTodoListActionType, RemoveTodoListActionType} from "./todolist-reducer";



type ActionType = FirstActionType |
    SecondActionType |
    ChangeTaskStatusActionType |
    ChangeTaskTitleActionType |
    AddTodoListActionType |
    RemoveTodoListActionType

export type FirstActionType = {
    type: 'REMOVE-TASK'
    tID: string
    todoListId: string

}

export type SecondActionType = {
    type: 'ADD-TASK'
    title: string
    todoListId: string

}

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    id: string
    isDone: boolean
    todoListId: string

}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    id: string
    newTitle: string
    todoListId: string

}

const initialState: TaskStateType = {}

export const tasksReducer = (state: TaskStateType = initialState, action:ActionType): TaskStateType => {
    switch(action.type) {
        case 'REMOVE-TASK' :{
            let todoListTask = state[action.todoListId]
            state[action.todoListId] = todoListTask.
            filter(f => f.id !== action.tID)

            return {...state}
        }

        case 'ADD-TASK' :{
            let copyState = {...state}
            let todoListTask = copyState[action.todoListId]
            let task = {id: v1(), title: action.title, isDone: false}
            copyState[action.todoListId] = [task, ...todoListTask]

            return copyState
        }

        case 'CHANGE-TASK-STATUS' :{

            let todoListTask = state[action.todoListId]
            state[action.todoListId] = todoListTask.map(t=> t.id === action.id
                ? {...t, isDone:action.isDone}
                : t)
            return {...state}
        }

        case 'CHANGE-TASK-TITLE' :{

            let todoListTask = state[action.todoListId]
            state[action.todoListId] = todoListTask.map(t=> t.id ===action.id
                ? {...t, title: action.newTitle}
                : t)
            return {...state}
        }

        case 'ADD-TODOLIST' :{
            let copyState = {...state}
            copyState[action.todolistId] = []
            return  copyState
        }

        case 'REMOVE-TODOLIST' :{
            let copyState = {...state}
           delete copyState[action.id]
            return  copyState
        }

        default:
            return state
    }

}

export const removeTaskAC = (tID: string, todoListId: string): FirstActionType => {
    return { type: 'REMOVE-TASK',tID: tID, todoListId: todoListId }
}

export const addTaskAC = (title: string, todoListId: string): SecondActionType => {
    return { type: 'ADD-TASK', title: title, todoListId: todoListId}
}

export const changeTaskStatusAC = (id: string, isDone: boolean, todoListId: string):
    ChangeTaskStatusActionType => {
    return { type: 'CHANGE-TASK-STATUS', id:id,isDone:isDone, todoListId: todoListId}
}

export const changeTaskTitleAC = (id: string, newTitle: string, todoListId: string):
    ChangeTaskTitleActionType => {
    return { type: 'CHANGE-TASK-TITLE', id:id,newTitle: newTitle, todoListId: todoListId}
}

export const AddTodolistAC = (title: string, todolistId:string): AddTodoListActionType => {
    return { type: 'ADD-TODOLIST', title: title, todolistId:todolistId}
}
