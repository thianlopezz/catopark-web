var md5 = require('md5');
const DataAccess = require('../modelos/DataAccess');

function Autenticacion() {

    this.login = function (tipoLogin, usuario, contrasena, callback) {

        DataAccess.exec_arraysp('seg_login', [tipoLogin, usuario, md5(contrasena)], function(error, result){
            if (error) {
                callback({ success: false, mensaje: 'Ocurrió un error inténtelo mas tarde.', error: error });
            } else {
                if (result[0][0].error) {
                    callback(new Error(result[0][0].mensaje));
                } else {
                    callback(null, { success: true, usuario: result[0][0] });
                }
            }
        });
    };

}

module.exports = new Autenticacion();
