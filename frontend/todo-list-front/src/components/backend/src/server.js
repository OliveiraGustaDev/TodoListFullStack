const express = require("express");
const cors = require("cors");
const todosRoutes = require("./routes");
const app = express();

app.use(express.json());
app.use(cors());
app.use(todosRoutes);

app.get("/health", (req, res) => {
  return res.json("up");
});

// Callback

app.listen(3333, () => {
  console.log("Servidor rodando na porta 3333");
  console.log("Banco de dados Online");
});
