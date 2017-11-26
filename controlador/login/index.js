// Se importan modulos
var express = require('express');
var APP = module.exports = express();

var cookieSession=require('cookie-session');
	APP.use(cookieSession({name:"session",
	 keys:["key1", "key2"]
}));
var MONGOO = require('mongoose');
// Se asigna el directoria de vistas
APP.set('views', __dirname + '/views');
// Funcion para resetear la sesión (logout)
APP.get("/logout",function(req,res){
    req.session=null;
    res.redirect("/");
})
//
APP.post("/login",function(req,res){
    db.User.findOne({email:req.body.email, password:req.body.password}, function(err,docs){
    if(err)
	console.log("Hubo un error");
    else
	if(docs!=null){
	    req.session.user_id=docs._id;
	    res.redirect("/selector");
	}
	else{
	    res.render('login',{res:true});
	    }
	})
})
APP.get("/newUser",function(req,res){ //recibe una peticion get que redirecciona para crear un nuevo perfil
    res.render("newUser");
})
APP.post("/createuser",function(req,res){
    db.User.find({email:req.body.email},function(err, usuario){
        if(usuario.length!=0){
            res.render("newUser",{res:false})
        }
        else{
            var user = new db.User({name:req.body.name, lastname:req.body.lastname, password:req.body.password,
            password_confirmation:req.body.passwordval, email:req.body.email}); //se reciben parametros JSON para crear nuevo usuario
            user.save(function(err){ //Se crea un nuevo usuario con el metodo save de la libreria mongoose
            if(err)
    	        res.render("newUser",{fail:true, str:err});
            else
                res.render("login",{creado:true})
            })
        }
    })
})


APP.get("/",function(req,res){
    if(req.session.user_id==undefined){
        res.render("login");
    }
    else
        if(req.session.currentproject!=undefined){
    	    res.redirect("/kanban");
        }
        else{
            res.redirect("/selector");
        }
})
