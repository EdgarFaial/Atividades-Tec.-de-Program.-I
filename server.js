const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}

const contatosFile = path.join(dataDir, 'contatos.json');

if (!fs.existsSync(contatosFile)) {
    fs.writeFileSync(contatosFile, JSON.stringify([]));
}


app.get("/", (req, res) => {
    res.render("index");
});

app.get("/index", (req, res) => {
    res.render("index");
});

app.get("/contato", (req, res) => {
    res.render("contato");
});

app.get("/detalhes", (req, res) => {
    res.render("detalhes");
});

app.get("/fotos", (req, res) => {
    res.render("fotos");
});

app.get("/produto", (req, res) => {
    res.render("produto");
});


app.post("/enviar-contato", (req, res) => {
    const { nome, email, mensagem } = req.body;
    
    const novoContato = {
        id: Date.now(), 
        nome: nome,
        email: email,
        mensagem: mensagem,
        data: new Date().toISOString()
    };
    
    fs.readFile(contatosFile, 'utf8', (err, data) => {
        let contatos = [];
        
        if (!err && data) {
            try {
                contatos = JSON.parse(data);
            } catch (e) {
                console.log("Erro ao parsear JSON:", e);
            }
        }
        
        contatos.push(novoContato);
        
        fs.writeFile(contatosFile, JSON.stringify(contatos, null, 2), (err) => {
            if (err) {
                console.error("Erro ao salvar contato:", err);
                return res.status(500).send("Erro ao salvar os dados.");
            }
            
            res.render("sucesso", { 
                mensagem: "Dados salvos com sucesso!",
                dados: novoContato
            });
        });
    });
});

app.use((req, res) => {
    res.status(404).send("<h1>Página não encontrada.</h1>");
});

app.listen(port, () => {
    console.log(`Servidor funcionando na porta: ${port}`);
    console.log(`Acesse: http://localhost:${port}`);
});