var express = require('express');
var app = module.exports = express();
var mongoo = require('mongoose');
app.set('views', __dirname + '/views');
//var User= require('../../modelos/index.js').User;
var cookieSession=require('cookie-session');
	app.use(cookieSession({name:"session",
	 keys:["key1", "key2"]
}));


app.get("/logout",function(req,res){
    req.session=null;
    res.redirect("/");
})

app.post("/login",function(req,res){
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
app.get("/newUser",function(req,res){ //recibe una peticion get que redirecciona para crear un nuevo perfil
    res.render("newUser");
})  
app.post("/createuser",function(req,res){
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


app.get("/",function(req,res){
    db.User.find(function(err,doc){
    if(req.session!=null){
        res.render("login");
    }
    else
	res.redirect("/kanban");	
    })
})
