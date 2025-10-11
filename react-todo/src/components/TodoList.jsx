import React, { useState } from "react";

const TodoList = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn React", completed: false },
    { id: 2, text: "Practice Testing", completed: true },
  ]);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    const todo = {
      id: Date.now(),
      text: newTodo,
      completed: false,
    };
    setTodos([...todos, todo]);
    setNewTodo("");
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-3">Todo List</h1>

      <form onSubmit={addTodo} className="mb-3">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add new todo"
          className="border px-2 py-1 mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded">
          Add
        </button>
      </form>

      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            onClick={() => toggleTodo(todo.id)}
            className={`cursor-pointer mb-2 ${
              todo.completed ? "line-through text-gray-500" : ""
            }`}
          >
            {todo.text}
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteTodo(todo.id);
              }}
              className="ml-3 text-red-500"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
