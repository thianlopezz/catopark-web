const connection = require('../conexion');

function DataAccess() {

    this.exec_objectsp = function (stored_procedure, data = {}, callback) {
        connection.acquire(function (error, con) {
            if (error) {
                callback(error);
            } else {

                const params = getParamsObject(data);

                const exec = 'call ' + stored_procedure + '(\'' + params + '\')';

                console.log('exec>> ' + exec);

                con.query(exec, function (error, result) {

                    con.release();

                    if (error) {
                        callback(error);
                    } else {
                        callback(null, result);
                    }
                });
            }
        });
    };

    this.exec_arraysp = function (stored_procedure, data = [], callback) {
        connection.acquire(function (error, con) {
            if (error) {
                callback(error);
            } else {

                const params = getParamsArray(data);

                const exec = 'call ' + stored_procedure + '(' + params + ')';

                console.log('exec>> ' + exec);

                con.query(exec, function (error, result) {

                    con.release();

                    if (error) {
                        callback(error);
                    } else {
                        callback(null, result);
                    }
                });
            }
        });
    };

    this.exec_query = function (sql, callback) {
        connection.acquire(function (error, con) {
            if (error) {
                callback(error);
            } else {

                console.log('query>> ' + sql);

                con.query(sql, function (error, result) {

                    con.release();

                    if (error) {
                        callback(error);
                    } else {
                        callback(null, result);
                    }
                });
            }
        });
    };

    this.getParamsObject = function (data) {
        return getParamsObject(data);
    };

    this.getParamsArray = function (array) {
        return getParamsArray(array);
    };

    this.attachProperty = function (xml, array = []) {

        const index = xml.indexOf('/>');

        if (index === -1) {
            throw (new Error('El xml no posee un formato correcto'))
        } else {

            xml = xml.substring(0, index) + ' ';
            for (let prop in array) {
                xml += prop + ' = "' + array[prop] + '" ';
            }

            xml += '/>';

            return xml;
        }
    }

    function getParamsObject(data) {

        let params = '<params ';

        for (let prop in data) {
            params += prop + ' = "' + data[prop] + '" ';
        }

        params += '/>';

        return params;
    }

    function getParamsArray(array) {

        let params = '';
        for (let i = 0; i < array.length; i++) {
            if (i < array.length - 1) {
                params += '\'' + array[i] + '\',';
            } else if (i === array.length - 1) {
                params += '\'' + array[i] + '\'';
            }
        }
        return params;
    }
}

module.exports = new DataAccess();
