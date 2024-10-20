import { useEffect, useState } from "react";
import Todos from "./components/Todos";
import axios from "axios";
import Search from "./components/Search";
import Footer from "./components/Footer";
import Filter from "./components/Filter";
import Login from "./components/Login";

import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState("");
  const [searchTodo, setSearchTodo] = useState("");
  const [filter, setFilter] = useState("all");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleWithNewButton = async () => {
    setShowInput(!showInput);
  };

  const getTodos = async () => {
    const response = await axios.get("http://localhost:3333/todos");
    setTodos(response.data);
  };

  const createTodo = async () => {
    if (!inputValue.trim()) {
      Swal.fire({
        icon: "info",
        title: "Preenchimento Obrigatório!",
        text: "É necessário preencher o título da tarefa para prosseguir!",
      });
      return;
    }

    const response = await axios.post("http://localhost:3333/todos", {
      name: inputValue,
    });

    getTodos();
    setShowInput(!showInput);
    setInputValue("");
  };

  const deleteTodo = async (todo) => {
    await axios.delete(`http://localhost:3333/todos/${todo.id} `);
    getTodos();
  };

  const modifyStatusTodo = async (todo) => {
    const response = await axios.put("http://localhost:3333/todos", {
      id: todo.id,
      status: !todo.status,
    });
    getTodos();
  };

  const handleEditTodo = async (todo) => {
    setSelectedTodo(todo);
    setInputValue(todo.name);
    setShowInput(true);
  };

  const editTodo = async () => {
    await axios.put("http://localhost:3333/todos", {
      id: selectedTodo.id,
      name: inputValue,
    });
    setSelectedTodo("");
    setShowInput(false);
    getTodos();
    setInputValue("");
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="app">
      <div className="container">
        {isAuthenticated ? ( // Verifica se o usuário está autenticado
          <>
            <div className="title">
              <h1>Lista de Tarefas</h1>
            </div>

            <Search searchTodo={searchTodo} setSearchTodo={setSearchTodo} />
            <Filter setFilter={setFilter} />
            <Todos
              todos={todos}
              deleteTodo={deleteTodo}
              modifyStatusTodo={modifyStatusTodo}
              selectedTodo={selectedTodo}
              setSelectedTodo={setSelectedTodo}
              handleEditTodo={handleEditTodo}
              searchTodo={searchTodo}
              filter={filter}
            />
            <input
              value={inputValue}
              style={{ display: showInput ? "block" : "none" }}
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
              placeholder="Digite o título da tarefa"
              className="input-name"
              type="text"
            />
            <button
              onClick={
                showInput
                  ? selectedTodo
                    ? editTodo
                    : createTodo
                  : handleWithNewButton
              }
              className="new-task-btn"
            >
              {showInput
                ? selectedTodo
                  ? "Editar Título"
                  : "Criar Tarefa"
                : "Adicionar nova tarefa"}
            </button>
            <Footer />
          </>
        ) : (
          <Login setIsAuthenticated={setIsAuthenticated} /> // Renderiza o componente de login
        )}
      </div>
    </div>
  );
}

export default App;
