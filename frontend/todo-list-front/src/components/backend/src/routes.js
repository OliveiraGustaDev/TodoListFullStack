const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const authenticateJWT = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // O token deve vir no formato "Bearer <token>"

  if (!token) {
    return res.status(401).json("Acesso negado. Token não fornecido.");
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json("Token inválido.");
    }

    req.user = user; // Armazena as informações do usuário na requisição
    next(); // Chama a próxima função na cadeia
  });
};

const todosRoutes = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Create
todosRoutes.post("/todos", async (request, response) => {
  const { name } = request.body;

  const todo = await prisma.todo.create({
    data: {
      name,
    },
  });

  return response.status(201).json(todo);
});

// Read

todosRoutes.get("/todos", async (request, response) => {
  const todos = await prisma.todo.findMany();
  return response.status(200).json(todos);
});

// Upadate
todosRoutes.put("/todos", async (request, response) => {
  const { name, id, status } = request.body;

  if (!id) {
    return response.status(400).json("Id é obrigatório");
  }

  const todoAlreadyExist = await prisma.todo.findUnique({ where: { id } });

  if (!todoAlreadyExist) {
    return response.status(404).json("Todo não existe");
  }

  const todo = await prisma.todo.update({
    where: {
      id,
    },
    data: {
      name,
      status,
    },
  });

  return response.status(200).json(todo);
});

// Delete

todosRoutes.delete("/todos/:id", async (request, response) => {
  const { id } = request.params;

  const intId = parseInt(id);

  if (!intId) {
    return response.status(400).json("Id é obrigatório");
  }

  const todoAlreadyExist = await prisma.todo.findUnique({
    where: { id: intId },
  });

  if (!todoAlreadyExist) {
    return response.status(404).json("Todo não existe");
  }

  await prisma.todo.delete({ where: { id: intId } });

  return response.status(200).send();
});

// Register User
todosRoutes.post("/register", async (req, res) => {
  const { username, password } = req.body;

  // Validação: verifica se username e password foram fornecidos
  if (!username || !password) {
    return res.status(400).json("Usuário e senha são obrigatórios.");
  }

  // Criptografa a senha antes de salvar
  const hashedPassword = await bcrypt.hash(password, 10);

  // Cria um novo usuário no banco de dados
  const user = await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
    },
  });

  return res.status(201).json(user);
});

// Login User
todosRoutes.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // Validação: verifica se username e password foram fornecidos
  if (!username || !password) {
    return res.status(400).json("Usuário e senha são obrigatórios.");
  }

  // Verifica se o usuário existe no banco de dados
  const user = await prisma.user.findUnique({
    where: { username },
  });

  // Se o usuário não existir, retorna erro
  if (!user) {
    return res.status(404).json("Usuário não encontrado.");
  }

  // Compara a senha fornecida com a senha armazenada
  const isPasswordValid = await bcrypt.compare(password, user.password);

  // Se a senha não for válida, retorna erro
  if (!isPasswordValid) {
    return res.status(401).json("Senha incorreta.");
  }

  // Gera um token de autenticação
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET, // Substitua pela variável de ambiente
    { expiresIn: "1h" } // O token expira em 1 hora
  );

  return res.status(200).json({ message: "Login bem-sucedido!", user, token });
});

module.exports = todosRoutes;
