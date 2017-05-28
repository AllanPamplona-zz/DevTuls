var express = require('express');
var app = module.exports = express();
var mongoo = require('mongoose');
app.set('views', __dirname + '/views');
var cookieSession = require('cookie-session');
app.use(cookieSession({name:"session",
    keys:["key1", "key2"]	 
}));
app.get('/selector', function(req, res){
        res.render('selector', {data: [{_id:1, nombre:"hola"},{_id:2,nombre:"adios"}]});
});
app.post('/seleccionado', function(req,res){
    req.session.currentproject = req.body.dato;
    res.send({redirect: '/kanban'})
});
app.post('/agregarproyecto', function(req,res){
   var proyecto = {
       nombre: req.body.nombre,

   }
});
