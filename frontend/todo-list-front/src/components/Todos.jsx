import { useState } from "react";
import "./Todos.css";

const Todos = ({
  todos,
  deleteTodo,
  modifyStatusTodo,
  handleEditTodo,
  searchTodo,
  filter,
}) => {
  const filteredTodos = todos.filter((todo) => {
    const matchesSearch = todo.name
      .toLowerCase()
      .includes(searchTodo.toLowerCase());

    if (filter === "completed") {
      return matchesSearch && todo.status;
    } else if (filter === "incomplete") {
      return matchesSearch && !todo.status;
    }

    return matchesSearch;
  });

  return (
    <div className="todos">
      {filteredTodos.map((todo) => {
        return (
          <div
            className={`todo ${todo.status ? "completed" : ""}`}
            key={todo.id}
          >
            <p>{todo.name}</p>
            <button
              onClick={() => modifyStatusTodo(todo)}
              className="check-btn"
            >
              <i className="far fa-check-circle"></i>
            </button>
            <button onClick={() => handleEditTodo(todo)} className="edit-btn">
              <i className="fas fa-pencil-alt"></i>
            </button>
            <button onClick={(e) => deleteTodo(todo)} className="delete-btn">
              <i className="fas fa-trash"></i>
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Todos;
