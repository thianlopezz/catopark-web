const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

var cors = require('cors');

const api = require('./api/rutas/api');

const forceSSL = function () {
  return function (req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(
        ['https://', req.get('Host'), req.url].join('')
      );
    }
    next();
  }
}

const app = express();

var conexion = require('./api/conexion');

app.use(cors());
app.use(forceSSL());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'dist')));

app.use('/api', api);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

const port = process.env.PORT || '5000';
app.set('port', port);
conexion.init();

const server = http.createServer(app);

server.listen(port, () => console.log(`Magic happens on port:${port}`));
