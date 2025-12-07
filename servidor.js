const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");   

let numeroSecreto = Math.floor(Math.random() * 100) + 1;
console.log("Número secreto (debug):", numeroSecreto);

app.get("/", (req, res) => {
  res.render("index", {
    mensagem: "",
    palpite: "",
    acertou: false,
    numeroSecreto: null
  });
});

app.post("/", (req, res) => {
  const palpite = Number(req.body.palpite);
  let mensagem = "";
  let acertou = false;

  if (palpite > numeroSecreto) {
    mensagem = "Seu palpite é muito alto!";
  } else if (palpite < numeroSecreto) {
    mensagem = "Seu palpite é muito baixo!";
  } else {
    mensagem = `Parabéns! Você acertou o número ${numeroSecreto}!`;
    acertou = true;
  }

  res.render("index", {
    mensagem,
    palpite,
    acertou,
    numeroSecreto: acertou ? numeroSecreto : null
  });
});

// Rota para reiniciar o jogo
app.post("/novo-jogo", (req, res) => {
  numeroSecreto = Math.floor(Math.random() * 100) + 1;
  console.log("Novo número secreto (debug):", numeroSecreto);
  res.redirect("/");
});

app.listen(8080, () => {
  console.log("Servidor rodando em http://localhost:8080");
});