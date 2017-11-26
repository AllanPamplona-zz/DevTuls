var EXPRESS = require('express');
var APP = module.exports = EXPRESS();
var MONGOO = require('mongoose');
var cookieSession=require('cookie-session');
	APP.use(cookieSession({name:"session",
	 keys:["key1", "key2"]
}));
// Recibe la llama get y retorna los proyectos, tareas y usuarios
APP.get("/servicio/proyecto", function(req,res){
    db.Proyecto.find({},function(err, proy){
        res.send({res:proy})
    })
})

APP.get("/servicio/miembros", function(req,res){
    db.User.find({},function(err, proy){
        res.send({res:proy})
    })
})
APP.get("/servicio/notas", function(req,res){
    db.Tarea.find({},function(err, proy){
        res.send({res:proy})
    })
})
// Recibe una llamada post con parametros email del usuario y retorna un mensaje de confirmación o error.
APP.post("/servicio/borrarusuario", function(req, res){
    db.User.find({email:req.body.data},function(err, uss)    {
        if(uss.length==0){
            res.send({data:"No existe"})
        }
        else{
            actualizar(uss[0]._id)
            actualizarnotas(uss[0]._id)
            db.User.find({_id:uss[0]._id}).remove(function(err){
                if(err){console.log(err)}
                else{
                    res.send({data:"Borrado"})
                }
            })
        }

    })
})
// Recibe como parametro  un email de usuario y su nuevo email para cambio y retorna mensaje de completado o error
APP.post("/servicio/cambiarcorreo",function(req,res){
    db.User.update({email:req.body.correo}, {$set:{email:req.body.nuevocorreo}},function(err){
        if(err){console.log(err)}
        else{
            res.send({res:"Actualizado con exito"})
        }
    })
})
function actualizarnotas(dato){
    db.Tarea.find({id_usuario:dato}).remove(function(err){
        if(err){console.log(err)}
        else{
        console.log("borrados")
        }
    })
}
function actualizar(dato){
    db.Proyecto.find({},function(err,res){
        res.forEach(function(eac){
            aux = eac.id_pertenecientes.indexOf(dato)
            if( aux != -1){
                db.Proyecto.update({_id:eac._id},{$pullAll: {id_pertenecientes:[dato]}}, function(){
                    console.log("funciono")
                })
            }
            else{
                if(eac.id_creador==dato){
                    db.Proyecto.find({_id:eac._id}).remove(function(err){
                        if(err){console.log(err)}
                        else{
                            console.log("funciono eliminar proyecto")
                        }
                    })
                }
            }
        })
    })
}
