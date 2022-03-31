const Sequelize = require('sequelize')
const sequelize = new Sequelize('boletim','root','',{
    host: 'localhost',
    dialect: 'mysql',
    port:3306
})

module.exports = {
    Sequelize,
    sequelize
}