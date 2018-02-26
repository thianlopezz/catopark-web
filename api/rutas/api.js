const express = require('express');
var jwt = require('jsonwebtoken');
const router = express.Router();

const secret = 'yep!';

var autenticacion = require('../modelos/Autenticacion');
var usuario = require('../modelos/Usuario');
var catalogo = require('../modelos/Catalogo');
var vehiculo = require('../modelos/Vehiculo');
var vehiOcupante = require('../modelos/VehiOcupante');

router.get('/', (req, res) => {
    res.send('api works! motherfuckers!');
});

// L O G I N
router.post('/aut/login', (req, res) => {

    autenticacion.login(req.body.usuario, req.body.contrasena, function (err, result) {

        if(err){
            res.send({success: false, mensaje: err.message, error: err});
        } else {

            var token = jwt.sign(result, secret, {
                expiresIn: "24h"
            });

            result.usuario.token = token;

            res.json(result);
        }
    });

});

// U S U A R I O S
router.get('/usuarios/all/:params', (req, res) => {
    usuario.getUsuarios(req.params.params, res);
});
router.get('/usuarios/porid/:params', (req, res) => {
    usuario.getPorId(req.params.params, res);    
});
router.post('/usuarios/', (req, res) => {
    usuario.mantenimiento(req.body, res);
});

// V E H I C U L O
router.get('/vehiculos/all/:params', (req, res) => {
    vehiculo.getVehiculos(req.params.params, res);
});
router.get('/vehiculos/porid/:params', (req, res) => {
    vehiculo.getPorId(req.params.params, res);
});
router.post('/vehiculos/', (req, res) => {
    vehiculo.mantenimiento(req.body, res);
});

// V E H I C U L O - O C U P A N T E
router.get('/vehiocupante/all/:params', (req, res) => {
    vehiOcupante.getVehiOcupante(req.params.params, res);
});
router.post('/vehiocupante/', (req, res) => {
    vehiOcupante.mantenimiento(req.body, res);
});

// C A T A L O G O
router.get('/catalogo/all/:tipo', (req, res) => {
    catalogo.getCatalogo(req.params.tipo, res);
});

// B R O K E R
// router.use(function (req, res, next) {

//     // check header or url parameters or post parameters for token
//     //var token = req.body.token || req.query.token || req.headers['x-access-token'];
//     var token = req.headers['x-access-token'];

//     if (token) {

//         jwt.verify(token, secret, function (err, decoded) {
//             if (err) {

//                 return res.json({ success: false, err: -1, mensaje: 'Failed to authenticate token.' });
//             } else {
//                 req.decoded = decoded;
//                 next();
//             }
//         });

//     } else {

//         // if there is no token
//         // return an error
//         return res.status(403).send({
//             success: false,
//             mensaje: 'No token provided.'
//         });

//     }
// });

// R U T A S  P R I V A D A S

module.exports = router;
