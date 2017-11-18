// Se importa la carpeta de modelos para inicializar la base de datos (Requerido tenerla iniciada)
require('./modelos');
// Se importa el express para usar en la aplicacion
var express = require("express");
// Se asinga a app la funcionalidad de express
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var bosy = require("body-parser");
var cookieSession=require('cookie-session');
var hbs = require('hbs');
// Importación de directorios 
var kanban = require("./controlador/kanban");
var selector = require("./controlador/selectorProyecto");
var login = require("./controlador/login");
var servicio = require("./servicios");

// Registro de direcciones publicas
app.use("/pub", express.static(('public')));
app.use("/node",express.static(('./node_modules/jquery/dist')));
app.use("/node1",express.static(('./node_modules/jquery-ui/dd')));
app.use("/socket",express.static(('./node_modules/socket.io-client/dist')));
hbs.registerPartials(__dirname+'views/views');
app.set("view engine","hbs");
//Utilidad de permisos para el socket
app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Headers", "Content-Type");
        res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
        next();
    });
// Se registran las rutas
app.use(bosy.urlencoded({extended: true}));
app.use(bosy.json()); //Peticiones json
app.use(login);
app.use(kanban);
app.use(selector);
app.use(servicio);
// Se registra el cookie
app.use(cookieSession({name:"session",
    keys:["key1", "key2"]
}));

// Se inicializa el servidor en el puerto 3030
app.set('port', process.env.PORT || 3030);
server.listen(app.get('port'));
io.on('connection', function(client){
    client.on('join', function(data){
        console.log(data);
    });
    client.on('update', function(data){
       client.emit('broad');
        client.broadcast.emit('broad');
    });
});
