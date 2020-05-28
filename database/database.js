const Sequelize = require('sequelize');

const connection = new Sequelize('gestaocontatos','root','123456',{
    host: 'localhost',
    port: '33006',
    dialect: 'mysql'
});

module.exports = connection;