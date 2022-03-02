const Sequelize = require('sequelize')

require('dotenv').config();

// create connection to our db 
const sequelize = new Sequelize('techBlog_db', 'username', 'password',{
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
} )

module.exports = sequelize;