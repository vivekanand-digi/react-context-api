import React, { createContext, useContext, useReducer } from 'react';

const initialState = {
    todos: [],
};

const TodoContext = createContext();

const ADD_TODO = 'ADD_TODO';
const REMOVE_TODO = 'REMOVE_TODO';
const UPDATE_TODO = 'UPDATE_TODO';

function todoReducer(state, action) {
    switch (action.type) {
        case ADD_TODO:
            return {
                ...state,
                todos: [...state.todos, action.payload],
            };
        case REMOVE_TODO:
            return {
                ...state,
                todos: state.todos.filter((todo) => todo.id !== action.payload),
            };
        case UPDATE_TODO:
            const updatedTodos = state.todos.map((todo) =>
                todo.id === action.payload.id ? { ...todo, text: action.payload.text } : todo
            );
            return {
                ...state,
                todos: updatedTodos,
            };
        default:
            return state;
    }
}

export function TodoProvider({ children }) {
    const [state, dispatch] = useReducer(todoReducer, initialState);

    const addTodo = (todo) => {
        dispatch({
            type: ADD_TODO,
            payload: todo,
        });
    };

    const removeTodo = (id) => {
        dispatch({
            type: REMOVE_TODO,
            payload: id,
        });
    };

    const updateTodo = (todo) => {
        dispatch({
            type: UPDATE_TODO,
            payload: todo,
        });
    };

    return (
        <TodoContext.Provider value={{ state, addTodo, removeTodo, updateTodo }}>
            {children}
        </TodoContext.Provider>
    );
}

export function useTodo() {
    return useContext(TodoContext);
}
