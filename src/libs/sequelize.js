const { Sequelize } = require("sequelize");
require ("dotenv").config();

const db_host = process.env.db_host
const db_user = process.env.db_user
const db_pass = process.env.db_pass
const db_name = process.env.db_name
const db_port = process.env.db_port

const user = encodeURIComponent(db_user);
const pass = encodeURIComponent(db_pass);

const URI = `mysql://${user}:${pass}@${db_host}:${db_port}/${db_name}`;
const options ={
    dialect: "mysql",
    loggin: true
}

const sequelize = new Sequelize(URI, options)

module.exports = sequelize;