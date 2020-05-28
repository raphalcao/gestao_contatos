const Sequelize = require("sequelize");
const connection = require("./database");

const Contato = connection.define('cadastro_contato', {
    
    nome:{
        type: Sequelize.STRING,
        allowNull: false
    },
    canal:{
        type: Sequelize.STRING,
        allowNull: false
    },
    valor:{
        type: Sequelize.STRING,
        allowNull: false
    },
    obs:{
        type: Sequelize.STRING,
        allowNull: false
    }

});

Contato.sync({force: false}).then(() => {});

module.exports = Contato;