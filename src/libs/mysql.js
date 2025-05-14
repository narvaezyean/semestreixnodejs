const mysql = require("mysql2/promise");

const db_host = process.env.db_host
const db_user = process.env.db_user
const db_pass = process.env.db_pass
const db_name = process.env.db_name
const db_port = process.env.db_port

async function createConnection() {
    const connection = await mysql.createConnection({
        host: db_host,
        port: db_port,
        user: db_user,
        password: db_pass,
        database: db_name
    });

    return connection;
}

module.exports = createConnection;