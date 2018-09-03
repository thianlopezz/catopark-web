const DataAccess = require('../modelos/DataAccess');

function Vehiculo() {

    this.getVehiculos = function (criterio, res) {
        DataAccess.exec_arraysp('ve_vehiculo', [criterio], function (error, result) {
            if (error) {
                res.send({ success: false, mensaje: 'Ocurrió un error inténtelo mas tarde.', error: error });
            } else {

                let vehiculos = result[0];

                for(let i=0; i<vehiculos.length; i++){
                    vehiculos[i].ocupantes = result[1].filter(x => x.idVehiculo === vehiculos[i].idVehiculo);
                }
                
                res.send({ success: true, data: vehiculos });
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
