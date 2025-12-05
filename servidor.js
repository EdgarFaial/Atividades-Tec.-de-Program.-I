const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));

const numeroSecreto = Math.floor(Math.random() * 100) + 1;
console.log("Número secreto (debug):", numeroSecreto);

app.get("/", (req, res) => {
  res.send(`
    <h1>Adivinhe o Número!</h1>
    <p>Digite um número entre 1 e 100:</p>
    <form method="POST" action="/">
      <input type="number" name="palpite" required />
      <button type="submit">Enviar</button>
    </form>
  `);
});

app.post("/", (req, res) => {
  const palpite = Number(req.body.palpite);
  let mensagem = "";

  if (palpite > numeroSecreto) {
    mensagem = "Seu palpite é <strong>muito alto</strong>!";
  } else if (palpite < numeroSecreto) {
    mensagem = "Seu palpite é <strong>muito baixo</strong>!";
  } else {
    mensagem = `<strong>Parabéns! Você acertou o número ${numeroSecreto}!</strong>`;
  }

  res.send(`
    <h1>Adivinhe o Número!</h1>

    <p>Você digitou: <strong>${palpite}</strong></p>
    <p>${mensagem}</p>

    <form method="POST" action="/">
      <input type="number" name="palpite" required />
      <button type="submit">Tentar novamente</button>
    </form>
  `);
});

app.listen(8080, () => {
  console.log("Servidor rodando em http://localhost:8080  ");
});
