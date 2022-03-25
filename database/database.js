const Sequelize = require('sequelize')
const connection = new Sequelize('guiaperguntas','root','Namualucaia',{
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection