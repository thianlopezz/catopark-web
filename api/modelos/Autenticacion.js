var md5 = require('md5');
const DataAccess = require('../modelos/DataAccess');

function Autenticacion() {

    this.login = function (usuario, contrasena, callback) {

        DataAccess.exec_arraysp('seg_login', [usuario, md5(contrasena)], function(error, result){
            if (error) {
                res.send({ success: false, mensaje: 'Ocurrió un error inténtelo mas tarde.', error: error });
            } else {
                if (result[0][0].mensaje) {
                    callback(new Error(result[0][0].mensaje));
                } else {
                    result[0][0].transacciones = result[1];
                    callback(null, { success: true, usuario: result[0][0] });
                }
            }
        });
    };

}

module.exports = new Autenticacion();
