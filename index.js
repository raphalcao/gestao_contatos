const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const connection = require("./database/database");
const Contato = require("./database/Contato");

connection
    .authenticate()
    .then(() => {
        console.log("Autenticado com sucesso.")
    })
    .catch((msgErro) => {
        console.log(msgErro);
    })

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(express.static('public'));


app.get("/contatos", (req, res) => {
    res.statusCode = 201;

    Contato.findAll({
        raw: true, order: [
            ['id', 'ASC']
        ]
    }).then(dados => {
        res.send(dados);

    });
});

app.get("/contato/:id", (req, res) => {

    if (isNaN(req.params.id)) {
        res.sendStatus(400);
    } else {
        var id = parseInt(req.params.id);
        Contato.findOne({
            where: { id: id }
        }).then(localiza_contato => {
            if (localiza_contato != undefined) {
                res.sendStatus == 200;
                res.send(localiza_contato);
            } else {
                res.sendStatus(400);
            }

        });
    }


});

app.post("/contato", (req, res) => {
    var { nome, canal, valor, obs } = req.body;
    Contato.create({
        nome: nome,
        canal: canal,
        valor: valor,
        obs: obs

    }).then(dados => {
        res.send(dados);
    })

    res.sendStatus(201);

});

app.put("/contato/:id", (req, res) => {

    if (isNaN(req.params.id)) {
        res.sendStatus(400);

    } else {
        var id = parseInt(req.params.id);
        var { nome, canal, valor, obs } = req.body;

        Contato.update({ nome: nome, canal: canal, valor: valor, obs: obs }, {
            where: {
                id: id
            }
        }).then(() => {
            res.sendStatus(200);

        }).catch(err => {
            res.sendStatus(400);

        });
    }
});


app.delete("/contato/:id", (req, res) => {

    if (isNaN(req.params.id)) {
        res.sendStatus(400);
    } else {
        var id = parseInt(req.params.id);


        Contato.destroy({
            where: { id: id }
        }).then(deletar_contato => {
            if (deletar_contato != undefined) {
                res.sendStatus(200);

            } else {
                res.sendStatus(400);
            }

        });
    }

});



app.listen(8080, () => {
    console.log("API em execução!");
});