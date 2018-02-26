const DataAccess = require('../modelos/DataAccess');

function Vehiculo() {

    this.getVehiculos = function (criterio, res) {
        DataAccess.exec_arraysp('ve_vehiculo', [criterio], function (error, result) {
            if (error) {
                res.send({ success: false, mensaje: 'Ocurrió un error inténtelo mas tarde.', error: error });
            } else {
                res.send({ success: true, data: result[0] });
            }
        });
    };

    this.getPorId = function (criterio, res) {
        connection.acquire(function (err, con) {
            if (err) {
                res.send({ success: false, mensaje: 'Ocurrió un error inténtelo mas tarde.', error: err });
            } else {

                con.query('call ve_vehiculo(\'' + criterio + '\')', function (err, result) {

                    con.release();

                    if (err) {
                        res.send({ success: false, mensaje: 'Ocurrió un error inténtelo mas tarde.', error: err });
                    } else {
                        var usuario = result[0][0];
                        usuario.roles = result[1];
                        res.send({ success: true, data: usuario });
                    }
                });
            }
        });
    };

    this.mantenimiento = function (vehiculo, res) {

        DataAccess.exec_objectsp('ve_vehiculo', vehiculo, function (error, result) {

            if (error) {
                res.send({ success: false, mensaje: 'Ocurrió un error inténtelo mas tarde.', error: error });
            } else {
                if (!result[0][0].error) {
                    res.send({ success: true, mensaje: result[0][0].mensaje });
                } else {
                    res.send({ success: false, mensaje: result[0][0].mensaje });
                }
            }
        });
    };
}

module.exports = new Vehiculo();
