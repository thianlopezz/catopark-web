const axios = require('axios');
const DataAccess = require('../modelos/DataAccess');

const API = 'https://correo-condominio.herokuapp.com';

function Parqueo() {

    this.getEntradas = function (idUsuario, res) {
        DataAccess.exec_arraysp('getEntradas', [idUsuario], function (error, result) {
            if (error) {
                res.send({ success: false, mensaje: 'Ocurrió un error inténtelo mas tarde.', error: error });
            } else {
                res.send({ success: true, data: result[0] });
            }
        });
    };

    this.setEntrada = function (placa, idUsuario, res) {
        DataAccess.exec_arraysp('setEntrada', [placa, idUsuario], function (error, result) {
            if (error) {
                res.send({ success: false, mensaje: 'Ocurrió un error inténtelo mas tarde.', error: error });
            } else {

                if (result[0][0].error) {
                    res.send({ success: false, mensaje: result[0][0].mensaje });
                } else {

                    let data = result[0];

                    for (let i = 0; i < data.length; i++) {
                        const claves = 'nombre:' + data[i].nombre + ';' + 'placa:' + data[i].placa + ';' + 'hora:' + data[i].hora;
                        enviaCorreo(claves, data[i].correo, 'Notificación de ingreso a parqueo', './plantillas/Catopark/entrada');
                    }

                    res.send({ success: true, data: data });
                }
            }
        });
    };

    this.getSalidas = function (idUsuario, res) {
        DataAccess.exec_arraysp('getSalidas', [idUsuario], function (error, result) {
            if (error) {
                res.send({ success: false, mensaje: 'Ocurrió un error inténtelo mas tarde.', error: error });
            } else {
                res.send({ success: true, data: result[0] });
            }
        });
    };

    this.setSalida = function (placa, idUsuario, res) {
        DataAccess.exec_arraysp('setSalida', [placa, idUsuario], function (error, result) {
            if (error) {
                res.send({ success: false, mensaje: 'Ocurrió un error inténtelo mas tarde.', error: error });
            } else {

                if (result[0][0].error) {
                    res.send({ success: false, mensaje: result[0][0].mensaje });
                } else {

                    let data = result[0];

                    for (let i = 0; i < data.length; i++) {
                        const claves = 'nombre:' + data[i].nombre + ';' + 'placa:' + data[i].placa + ';' + 'hora:' + data[i].hora;
                        enviaCorreo(claves, data[i].correo, 'Notificación de salida a parqueo', './plantillas/Catopark/salida');
                    }

                    res.send({ success: true, data: data });
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
            plantilla: plantilla
        };

        axios.post(`${API}/api/send`, correo)
            .then(result => {
                console.log('Enviado');
            })
            .catch(error => {

                console.log("Err>>" + error);
                callback(error);
            });
    }

}

module.exports = new Parqueo();
