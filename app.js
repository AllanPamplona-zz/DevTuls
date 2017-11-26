// Se importa la carpeta de modelos para inicializar la base de datos (Requerido tenerla iniciada)
require('./modelos');
// Se importa el express para usar en la aplicacion
var express = require("express");
// Se asinga a app la funcionalidad de express
var APP = express();
var SERVER = require('http').Server(APP);
var IO = require('socket.io')(SERVER);
var BOSY = require("body-parser");
var cookieSession=require('cookie-session');
var hbs = require('hbs');
// Importación de directorios
var KANBAN = require("./controlador/kanban");
var SELECTOR = require("./controlador/selectorProyecto");
var LOGIN = require("./controlador/login");
var SERVICIO = require("./servicios");

// Registro de direcciones publicas
APP.use("/pub", express.static(('public')));
APP.use("/node",express.static(('./node_modules/jquery/dist')));
APP.use("/node1",express.static(('./node_modules/jquery-ui/dd')));
APP.use("/socket",express.static(('./node_modules/socket.io-client/dist')));
hbs.registerPartials(__dirname+'views/views');
APP.set("view engine","hbs");
//Utilidad de permisos para el socket
APP.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Headers", "Content-Type");
        res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
        next();
    });
// Se registran las rutas
APP.use(BOSY.urlencoded({extended: true}));
APP.use(BOSY.json()); //Peticiones json
APP.use(LOGIN);
APP.use(KANBAN);
APP.use(SELECTOR);
APP.use(SERVICIO);
// Se registra el cookie
APP.use(cookieSession({name:"session",
    keys:["key1", "key2"]
}));

// Se inicializa el servidor en el puerto 3030
APP.set('port', process.env.PORT || 3030);
SERVER.listen(APP.get('port'));
IO.on('connection', function(client){
    client.on('join', function(data){
        console.log(data);
    });
    client.on('update', function(data){
       client.emit('broad');
        client.broadcast.emit('broad');
    });
});
