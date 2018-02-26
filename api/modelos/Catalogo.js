var connection = require('../conexion');
const DataAccess = require('../modelos/DataAccess');

function Catalogo() {

    this.getCatalogo = function (tipo, res) {
        DataAccess.exec_arraysp('cat_catalogo', [tipo], function(error, result){

            if (error) {
                res.send({ success: false, mensaje: 'Ocurrió un error inténtelo mas tarde.', error: error });
            } else {
                res.send({ success: true, data: result[0] });
            }
        });
    };
}

module.exports = new Catalogo();
