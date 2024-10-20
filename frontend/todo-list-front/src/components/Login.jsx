import { useState } from "react";
import axios from "axios";
import "./Login.css";

const Login = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3333/login", {
        username,
        password,
      });

      // Se a autenticação for bem-sucedida
      if (response.data.token) {
        setIsAuthenticated(true); // Atualiza o estado para autenticado
      } else {
        setError("Credenciais inválidas. Tente novamente.");
      }
    } catch (error) {
      Swal.fire({
        icon: "info",
        title: "Usuário não encontrado!",
        text: "Verifique se digitou corretamente o nome de usuário e senha e tente novamente.",
      });
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <form onSubmit={handleLogin} className="login-form">
        <input
          type="text"
          placeholder="Nome de Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Entrar</button>
      </form>
      {error && <p className="login-error">{error}</p>}
    </div>
  );
};

export default Login;
