import React, { useState } from 'react';
import { useTodo } from './TodoContext';

function TodoList() {
    const { state, addTodo, removeTodo, updateTodo } = useTodo();
    const [editTodos, setEditTodos] = useState({});
    const [newTodo, setNewTodo] = useState('');
    const [editTodo, setEditTodo] = useState('');

    const handleAddTodo = () => {
        if (newTodo.trim() !== '') {
            addTodo({
                id: Date.now(),
                text: newTodo,
            });
            setNewTodo('');
        }
    };

    const handleRemoveTodo = (id) => {
        removeTodo(id);
    };

    const handleEditTodo = (todo) => {
        setEditTodos({
            ...editTodos,
            [todo.id]: true,
        });
        setEditTodo(todo.text);
    };

    const handleUpdateTodo = (id) => {
        if (editTodo.trim() !== '') {
            updateTodo({
                id,
                text: editTodo,
            });
            setEditTodos({
                ...editTodos,
                [id]: false,
            });
            setEditTodo('');
        }
    };

    const handleCancelEdit = (id) => {
        setEditTodos({
            ...editTodos,
            [id]: false,
        });
        setEditTodo('');
    };

    const isEditing = (id) => {
        return editTodos[id];
    };

    return (
        <div>
            <h1>Todo List</h1>
            <div>
                <input
                    type="text"
                    placeholder="Add a new todo"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                />
                <button onClick={handleAddTodo}>Add</button>
            </div>
            <ul>
                {state.todos.map((todo) => (
                    <li key={todo.id}>
                        {isEditing(todo.id) ? (
                            <>
                                <input
                                    type="text"
                                    value={editTodo}
                                    onChange={(e) => setEditTodo(e.target.value)}
                                />
                                <button onClick={() => handleUpdateTodo(todo.id)}>Save</button>
                                <button onClick={() => handleCancelEdit(todo.id)}>Cancel</button>
                            </>
                        ) : (
                            <>
                                {todo.text}
                                <button onClick={() => handleRemoveTodo(todo.id)}>Remove</button>
                                <button onClick={() => handleEditTodo(todo)}>Edit</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TodoList;
