var md5 = require('md5');
const DataAccess = require('../modelos/DataAccess');

function Usuario() {

    this.getUsuarios = function (criterio, res) {
        DataAccess.exec_arraysp('us_usuario', [criterio], function(error, result){
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
                
                con.query('call us_usuario(\'' + criterio + '\')', function (err, result) {

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

    this.mantenimiento = function (data, res) {

        var xml = setXml(data);
        
        DataAccess.exec_arraysp('us_usuario', [xml], function(error, result){

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

    function setXml(data) {

        data.contrasena = data.contrasena || ''
        
        return '<params accion="' + data.accion
            + '" idUsuario="' + (data.idUsuario || '')
            + '" idCarrera="' + (data.idCarrera || 0)
            + '" correo="' + data.correo
            + '" usuario="' + data.usuario
            + '" contrasena="' +  md5(data.contrasena)
            + '" nombre="' + data.nombre
            + '" cedula="' + data.cedula
            + '" telefono="' + data.telefono
            + '" idTipo="' + data.idTipo
            + '" />'
    }

}

module.exports = new Usuario();
