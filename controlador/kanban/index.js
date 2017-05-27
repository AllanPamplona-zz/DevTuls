var express = require('express');
var app = module.exports = express();
var mongoo = require('mongoose');
app.set('views', __dirname + '/views');
var cookieSession = require('cookie-session');
app.use(cookieSession({name:"session",
    keys:["key1", "key2"]	 
}));

app.get('/kanban', function(req, res){
        res.render('kanban');
});

app.post('/update', function(req, res){
    db.Tarea.find({id_proyecto:req.session.currentproject },function(err,users){
        res.send(users);

    });
});

app.post('/getid',function(req,res){
    res.send(req.session.user_id)
});

app.post('/createtask', function(req , res){
    var t = db.Tarea({
        contenido: req.body.contenido,
        fecha : req.body.fecha,
        estado: req.body.estado,
        id_usuario: req.session.user_id,
        id_proyecto: req.session.currentproject
    });
    t.save(function(error, user){
        if(error) {console.log(error);}
        res.send("1dd");
    });
});
app.post('/actu', function(req,res){
    db.Tarea.update({_id:mongoo.Types.ObjectId(req.body.id)},{$set: {estado: req.body.estado}}, function(err){
        if (err) {console.log(err);}else{
        }
        res.send("1dd");
    });
});
app.post('/delete', function(req,res){
    db.Tarea.find({_id:mongoo.Types.ObjectId(req.body.id)}).remove(function(err){
        if (err) {console.log(err);}
        res.send("1dd");
    });
});
