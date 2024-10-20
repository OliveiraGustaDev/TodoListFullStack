import React from "react";

import "./Search.css";

const Search = ({ searchTodo, setSearchTodo }) => {
  return (
    <div className="search-bar">
      <p className="search-title">Pesquisar :</p>
      <input
        type="text"
        placeholder="Buscar tarefa..."
        value={searchTodo}
        onChange={(e) => setSearchTodo(e.target.value)}
        className="search-input"
      />
    </div>
  );
};

export default Search;
