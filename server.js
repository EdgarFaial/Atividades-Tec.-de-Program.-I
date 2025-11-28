const port = 8080;

//Express
const express = require("express");
const app = express();
app.set('view engine', 'ejs');

app.get("/index", (request, response) => {
response.render("index");
});

app.get("/RESPOSTA", (req, res) =>{
    nome = req.query.nomezinho, sobrenome = req.query.sobrenome, cidade = req.query.cidade
    res.render("RESPOSTA",{nome,sobrenome,cidade})
})



app.listen(port, () => {
console.log(`Servidor funcionando na porta: ${port}`);
});

