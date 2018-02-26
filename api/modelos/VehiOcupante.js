const DataAccess = require('../modelos/DataAccess');

function VehiOcupante() {

    this.getVehiOcupante = function (criterio, res) {
        DataAccess.exec_arraysp('ve_vehiOcupante', [criterio], function (error, result) {
            if (error) {
                res.send({ success: false, mensaje: 'Ocurrió un error inténtelo mas tarde.', error: error });
            } else {
                res.send({ success: true, data: result[0] });
            }
        });
    };

    this.mantenimiento = function (vehiOcupante, res) {

        DataAccess.exec_objectsp('ve_vehiOcupante', vehiOcupante, function (error, result) {

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

module.exports = new VehiOcupante();
