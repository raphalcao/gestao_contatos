const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(express.static('public'));


var Contato = {
    gestao_contatos: [
        {
            id: 01,
            nome: "José da Silva",
            canal: "2195545-8215",
            valor: "Telefone",
            obs: "Qualquer coisa"
        },

        {
            id: 02,
            nome: "Antônio José",
            canal: "antonio@gmail.com",
            valor: "Email",
            obs: "Qualquer coisa"
        },

        {
            id: 03,
            nome: "Maria Aparecida",
            canal: "499632-8623",
            valor: "Telefone",
            obs: "Qualquer coisa"
        }
    ]
}


app.get("/contatos", (req, res) => {
    res.statusCode = 201;
    res.json(Contato.gestao_contatos);
    
});

app.get("/contato/:id", (req, res) => {
    
    var id = req.params.id;

    if (isNaN(req.params.id)) {
        res.sendStatus(400);

    } else {
        var id = parseInt(req.params.id)

        var localiza_contato = Contato.gestao_contatos.find(lc => lc.id == id);

        if (localiza_contato != undefined) {
            res.sendStatus = 201,
                res.json(localiza_contato);
        } else {

            res.sendStatus(404);
        }

    }

    

});

app.post("/contato", (req, res) => {
    var { id, nome, canal, valor, obs } = req.body;

    Contato.gestao_contatos.push({
        id,
        nome,
        canal,
        valor,
        obs
    });

    res.sendStatus(201);

});

app.put("/contato/:id", (req, res) => {

    if (isNaN(req.params.id)) {
        res.sendStatus(400);
    } else {
        var id = parseInt(req.params.id);

        var consulta_contato = Contato.gestao_contatos.find(g => g.id == id);

        if (consulta_contato != undefined) {

            var { id, nome, canal, valor, obs } = req.body;           


            if (id != undefined) {
                consulta_contato.id = id;
            }

            if (nome != undefined) {
                consulta_contato.nome = nome;
            }

            if (canal != undefined) {
                consulta_contato.canal = canal;
            }

            if (valor != undefined) {
                consulta_contato.valor = valor;
            }

            if (obs != undefined) {
                consulta_contato.obs = obs;
            }

            res.sendStatus(201);

        } else {

            res.sendStatus(404);

        }
    }

});


app.delete("/contato/:id", (req, res) => {
   
    if (isNaN(req.params.id)) {
        res.sendStatus(400);
    } else {
        var id = parseInt(req.params.id);

        var index = Contato.gestao_contatos.findIndex(g => g.id == id);

        if (index == -1) {
            res.sendStatus(404);
        } else {
            Contato.gestao_contatos.splice(index, 1);
            res.sendStatus(200);
        }

    }
  
});



app.listen(8080, () => {
    console.log("API em execução!");
});