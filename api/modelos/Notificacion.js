const axios = require('axios');
const DataAccess = require('../modelos/DataAccess');

const API = 'https://correo-generico.herokuapp.com';

function Notificacion() {

    this.getNotificaciones = function (xmlParams, res) {
        DataAccess.exec_arraysp('no_notificacion', [xmlParams], function (error, result) {
            if (error) {
                res.send({ success: false, mensaje: 'Ocurrió un error inténtelo mas tarde.', error: error });
            } else {
                res.send({ success: true, data: result[0] });
            }
        });
    };

    // this.getPorId = function (criterio, res) {
    //     connection.acquire(function (err, con) {
    //         if (err) {
    //             res.send({ success: false, mensaje: 'Ocurrió un error inténtelo mas tarde.', error: err });
    //         } else {

    //             con.query('call us_usuario(\'' + criterio + '\')', function (err, result) {

    //                 con.release();

    //                 if (err) {
    //                     res.send({ success: false, mensaje: 'Ocurrió un error inténtelo mas tarde.', error: err });
    //                 } else {
    //                     var usuario = result[0][0];
    //                     usuario.roles = result[1];
    //                     res.send({ success: true, data: usuario });
    //                 }
    //             });
    //         }
    //     });
    // };

    this.mantenimiento = function (params, res) {

        DataAccess.exec_objectsp('no_notificacion', params, function (error, result) {

            if (error) {
                res.send({ success: false, mensaje: 'Ocurrió un error inténtelo mas tarde.', error: error });
            } else {
                if (!result[0][0].error) {

                    try {

                        // const claves = 'tipoVehiculo:' + params.tipoVehiculo + ';' + 'placa:' + params.placa + ';' + 'guardia:' + params.guardia + ';' + 'notificacion:' + params.notificacion;
                        enviaCorreo(params, params.correos, 'Notificación - Catopark', './plantillas/Catopark/notificacion');
                    } catch (e) {
                        console.log(e);
                    }

                    res.send({ success: true, mensaje: result[0][0].mensaje });
                } else {
                    res.send({ success: false, mensaje: result[0][0].mensaje });
                }
            }
        });
    };

    function enviaCorreo(claves, correo, asunto, plantilla) {
        // const claves = 'usuario:' + model.Correo + ';' + 'contra:' + nueva;

        console.log(claves);

        var correo = {
            idHospedaje: 0,
            asunto: asunto,
            destinatario: correo,
            claves: claves,
            plantilla: plantilla,
            token: 91011
        };
        

        axios.post(`${API}/api/send/v2`, correo)
            .then(result => {
                console.log('Enviado');
            })
            .catch(error => {

                console.log("Err>>" + error);
                callback(error);
            });
    }

}

module.exports = new Notificacion();
