const express = require("express");
const app = express();
const path = require("path");

// Configurar EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Rota principal que exibe o formulário
app.get("/", (req, res) => {
    res.render("index"); // Renderiza o arquivo index.ejs
});

// Rota que processa a conversão
app.get("/converter", (req, res) => {
    const valorBRL = parseFloat(req.query.valor);

    if (isNaN(valorBRL)) {
        return res.send("Por favor, insira um número válido.");
    }

    const taxa = 0.18; // 1 real = 0.18 dólares (exemplo)
    const valorUSD = (valorBRL * taxa).toFixed(2);

    res.send(`💱 ${valorBRL} reais equivalem a <strong>US$ ${valorUSD}</strong>.`);
});

// Servidor
app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});
