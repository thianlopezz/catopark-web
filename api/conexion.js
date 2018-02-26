var mysql = require('mysql');

function Conexion() {
    this.pool = null;

    this.init = function () {
        this.pool = mysql.createPool({
            connectionLimit: 10,
            host: 't89yihg12rw77y6f.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
            port: 3306,
            user: 'iw8pdomrm32sfuv9',
            password: 'gzk7l0m42rfbnre1',
            database: 'p7xw8asy75pyvzhz'
        });
    };

    this.acquire = function (callback) {
        this.pool.getConnection(function (err, connection) {
            callback(err, connection);
        });
    };
}

module.exports = new Conexion();
