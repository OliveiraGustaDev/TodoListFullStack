import React from "react";
import "./Filter.css";

const Filter = ({ setFilter }) => {
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div className="filter">
      <h2>Filtrar:</h2>
      <div className="filter-options">
        <div>
          <p>Status:</p>
          <select onChange={handleFilterChange}>
            <option value="all">Todas</option>
            <option value="completed">Completas</option>
            <option value="incomplete">Incompletas</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filter;
