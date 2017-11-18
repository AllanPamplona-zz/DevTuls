var auxDrag,
  URL_SOCKET = "192.168.2.103:3030",
  checkModal = false,
  abrio = false
function update(){
    $.ajax({
        url: 'http://'+URL_SOCKET+'/update',
        method: 'POST'
    }).then(function(response){
        getId(response);
    }).catch(function(err){
        console.error(err);
    });
}

function getId(res){
    $.ajax({
        url: 'http://'+URL_SOCKET+'/getid',
        method: 'POST'
    }).then(function(response){
        create(res,response)
    }).catch(function(err){
        console.error(err)
    });
}

function create(json, res){
  for (var i = 0; i < TABLEROS.length; i++) {
    $("#"+ID_TABLEROS[i]+"").empty();
  }
  for (j in ID_TABLEROS) {
      $("#"+ID_TABLEROS[j]).append("</br></br>");
    for(i in json){
      if (ID_TABLEROS[j] == json[i].estado) {
          if(res==json[i].id_usuario){
                $("#"+ID_TABLEROS[j]+"").append("<div class=\"tarea row \" id="+json[i]._id+"><div class=\"col s12\"><div class=\"card  amber accent-1 white-text\"><div><a id=\""+json[i]._id+"\" class=\"waves-effect waves-light btn nota\"> X </a></div><div class=\"contenido\">"+json[i].contenido+ "<br>" + new Date(json[i].fecha)+ "</div></div></div></div>");
          }
          else{
                $("#"+ID_TABLEROS[j]+"").append("<div class=\"row \" id="+json[i]._id+"><div class=\"col s12\"><div class=\"card lime lighten-3 white-text\"><div class=\"contenido\">"+json[i].contenido+ "<br>" + new Date(json[i].fecha)+ "</div></div></div></div>");
          }
          if(res==json[i].id_usuario){
          $('#'+json[i]._id+'').draggable();
          }
      }
    }
  }

$("a").click(function(){
    var $clase = $(this).attr("class")
    if($clase.indexOf("nota")!=-1){
        var myid = {id:$(this).attr("id")};
        erase(myid);
    }
});
}

var SOCKET = io.connect(URL_SOCKET);
SOCKET.on('connect', function(data){
    SOCKET.emit('join', 'Hellow world from client');
});
SOCKET.on('broad', function(data){
    update();
});

//Crear Tableros
var TABLEROS = ["To do", "Doing","Finish"],
  ID_TABLEROS =["to_do_it","doing","done"]

//Pone los tableros en el HTML
$(".tab").append("<div class=\"row crow\">");
for (var i = 0; i < TABLEROS.length; i++) {
  $(".crow").append("<div class=\"tabler col s3\"><div class=\"card orange lighten-3\"><div class=\"card-content white-text\" ><span class=\"card-title\" id=\""+TABLEROS[i]+"\">"+TABLEROS[i]+"</span><div class=\"row\"><div id=\""+ID_TABLEROS[i]+"\" class=contai></br></br></div><div class=\"input-field col s11\"><input  id=\"nuevanota"+i+"\" class=\""+ID_TABLEROS[i]+"\" type=\"text\" class=\"validate\"><label class=\"active\" for=\"nuevanota\">Nueva Nota</label></div></div></div></div></div>");
}
$(".tab").append("</div>");


$("#nuevanota0").on('keyup', function(e){
    if(e.keyCode==13){
        var comp = {
            contenido:  $("#nuevanota0").val(),
            fecha: new Date(),
            estado: "to_do_it"
        };
        $("#nuevanota0").val("")
        save(comp);
    }
});

$("#nuevanota1").on('keyup', function(e){
    if(e.keyCode==13){
        var comp = {
            contenido:  $("#nuevanota1").val(),
            fecha: new Date(),
            estado: "doing"
        };
        $("#nuevanota1").val("")
        save(comp);
    }
});
$("#nuevanota2").on('keyup', function(e){
    if(e.keyCode==13){
        var comp = {
            contenido: $("#nuevanota2").val(),
            fecha: new Date(),
            estado: "done"
        }
        $("#nuevanota2").val("")
        save(comp);
    }
});
$("#idmiembros").click(function(er){
   checkModal = true
    abrio=true
})
$(document).keyup(function(e){
    if(e.keyCode==27 && checkModal){
        checkModal = false
    }
})
$(document).click(function(e){
    if(!$(e.target).closest('#modal1').length && !$(e.target).closest('#modal2').length){
    if(checkModal){
    abrio = !abrio
    }}
    if(abrio){
    if(!$(e.target).closest('#modal1').length && !$(e.target).closest('#modal2').length){
        if($('#modal1').is(":visible")){
            $('#modal1').modal('close')
            checkModal = false
        }
    }
    }
})

function updatemiembros(){
  $.ajax({
            url:'http://'+URL_SOCKET+'/miembrosupdate',
            method:'POST'
        }).then(function(data){
            $("#miembros").empty()
            var aux = "";

            data.usuarios.forEach(function(x){
                if(data.jefe){
                    aux = '<span class="badge"><button id="'+x._id+'"class="botoneliminar">X</button></span>'
                }
               $("#miembros").append('<li id="'+x._id+'s" class="miembro collection-item">'+aux+x.name+' '+x.lastname+'</li>')
            })
            $("#creador").text("Propietario: "+data.propietario[0].name+" "+data.propietario[0].lastname)
            $('.botoneliminar').click(function(e){
                borrarmiembro(this.id)
            });
            if(!data.jefe){
                $("#modal2abrir").attr("href","#!")
                $("#remover").off('click')
            }
        }).catch(function(err){
            console.error(err)
        });

}
$("#closemodal").click(function(){
    $("#coleccionmodal").empty();
    $("#emailmodal").val('');
})

function agregar(json){
    if($('#'+json[0]._id).length==0){
        $("#coleccion").append('<li id="'+json[0]._id+'" value="'+json[0]._id+'"class="collection-item dismissable"><div>'+json[0].name+' '+json[0].lastname+'</div></li>')
    }
    else{
        alert("El usuario ya se encuentra en el proyecto")
    }
}


$("#agregar").click(function(){
    var $data = $('#email').val();
    if($data.length==0){
        return
    }
    $.ajax({
        url: 'http://'+URL_SOCKET+'/validaremail',
        data: {email:data},
        method: 'POST'
    }).then(function(data){
        if($data.resultado == "1"){
            agregar($data.usuario)
        }else{
            if($data.resultado == "0"){
                alert("El usuario no se encuentra en el sistema")
            }
        }
    }).catch(function(err){
        console.error(err)
    });
});


$("#añadir").click(function(){
    var $pertenece = $("#coleccion li");
    var perteArray = []
        $pertenece.each(function(idx,li){
            perteArray.push($(li).attr('value'))
        });
        $.ajax({
            url:'http://'+URL_SOCKET+'/agregarmiembros',
            data: {pertenece:perteArray},
            method:'POST'
        }).then(function(data){
            if(data.resultado=="1"){
                alert("Se guardo con exito")
                $('#modal2').modal('close');
                $("#coleccion").empty();
                $("#email").val('');
                updatemiembros()
            }
            else{
                alert("No se pudo guardar")
            }
        }).catch(function(err){
            console.error(err)
        });
})

function borrarmiembro(id){
    $.ajax({
        url: 'http://'+URL_SOCKET+'/borrarmiembro',
        data: {id:id},
        method:'POST'
    }).then(function(data){
        updatemiembros()
        update()
    }).catch(function(err){
        console.log(err)
    })
}
function updateselect(){
 $.ajax({
            url:'http://'+URL_SOCKET+'/selecupdate',
            method:'POST'
        }).then(function(data){
            $("#dropdown1").empty()
            $("#dropdown1").append('<li class="proyectos" id="disable">Escoja un proyecto</li>')
            var aux = "";
            data.proy.forEach(function(x){
                if(x._id==data.actu){
                    aux = x.nombre;
                }
                else{
               $("#dropdown1").append('<li class="proyectos" id="'+x._id+'">'+x.nombre+'</li>')
                }
            })
            $("#dropdown1").append('<li class="divider"></li>')
            $("#dropdown1").append('<li class="proyectos" id="nuevo"><a href="#modal3">Nuevo proyecto</a></li>')
            $("#idproyecto").html(aux + '<i class="material-icons right">arrow_drop_down</i>')
              $(".proyectos").click(function(e){
                  if(this.id!="disable" && this.id!="nuevo"){
                        proyectosiguiente(this.id)
                  }
              });
        }).catch(function(err){
            console.error(err)
        });

}

function proyectosiguiente(id){
    $.ajax({
        url:'http://'+URL_SOCKET+'/cambiarproyecto',
        data: {dato:id},
        method:'POST'
    }).then(function(data){
        window.location.href=data.redirect;
    }).catch(function(err){
        console.error(err)
    });
}
$('#remover').click(function(){
    $.ajax({
        url: 'http://'+URL_SOCKET+'/deleteproject',
        method: 'POST'
    }).then(function(data){
        window.location.href=data.redirect;
    }).catch(function(err){
        console.error(err)
    });
});

function save(data){
    $.ajax({
        url: "http://"+URL_SOCKET+"/createtask",
        data: data,
        method: "post"
    }).then(function(response){
        SOCKET.emit('update', "update");
    }).catch(function(err){
        console.log(err);
    });
};
function actu(data){
    $.ajax({
        url: "http://"+URL_SOCKET+"/actu",
        data: data,
        method: "post"
    }).then(function(response){
        SOCKET.emit('update','update');
    }).catch(function(err){
        console.log(err);
    });
};

function erase(data){
    $.ajax({
        url: "http://"+URL_SOCKET+"/delete",
        data: data,
        dataType: 'application/json',
        method: "post"
    }).then(function(response){
        SOCKET.emit('update','update');
    }).catch(function(err){
        SOCKET.emit('update','update');
        console.log(err);
    });
};
//Vuelve dragueables las notas;
$('#uno').draggable();
$('.contai').droppable({
    drop: function(event, ui){
        var data = {
            id: ui.draggable.attr("id"),
            estado: $(this).attr("id")
        }
        actu(data);
    }
});
update()
$("#closemodal2").click(function(){
    $("#coleccionmodal").empty();
    $("#nombremodal").val('');
    $("#emailmodal").val('');
})
$("#añadirmodal").click(function(){
    var $pertenece = $("#coleccionmodal li");
    var $nombre = $('#nombremodal').val();
    var perteArray = []
    if($nombre.length == 0){
        alert("Debe ingresar un nombre")
    }
    else{
        $pertenece.each(function(idx,li){
            perteArray.push($(li).attr('value'))
        });
        $.ajax({
            url:'http://'+URL_SOCKET+'/agregarproyecto',
            data: {nombre:$nombre, pertenece:perteArray, kan:"1"},
            method:'POST'
        }).then(function(data){
            if(data.resultado=="1"){
                alert("Se guardo con exito")
                $('#modal3').modal('close');
                $("#coleccionmodal").empty();
                $("#nombremodal").val('');
                $("#emailmodal").val('');
                updateselect()
            }
            else{
                alert("No se pudo guardar")
            }
        }).catch(function(err){
            console.error(err)
        });
    }
})
$("#agregarmodal").click(function(){
    var $data = $('#emailmodal').val();
    if($data.length==0){
        return
    }
    $.ajax({
        url: 'http://'+URL_SOCKET+'/validaremail',
        data: {email:data},
        method: 'POST'
    }).then(function(data){
        if($data.resultado == "1"){
            agregarmodal($data.usuario)
        }else{
            if($data.resultado == "0"){
                alert("El usuario no se encuentra en el sistema")
            }
        }
    }).catch(function(err){
        console.error(err)
    });
});

function agregarmodal(json){
    if($('#'+json[0]._id).length==0){
        $("#coleccionmodal").append('<li id='+json[0]._id+' value='+json[0]._id+'><div>'+json[0].name+'</div></li>')
    }
    else{
        aux = $('#'+json[0]._id).attr("class")
        if(aux=="botoneliminar"){
            $("#coleccionmodal").append('<li id='+json[0]._id+' value='+json[0]._id+'><div>'+json[0].name+'</div></li>')
        }else{
        alert("El usuario ya se encuentra en el proyecto")
        }
    }
}

$(document).ready(function(){
  var texto;
  $('.modal').modal({
      dismissible: true,
      });
    updateselect()
    updatemiembros()
  $("#idmiembros").click(function(){
    $texto = $("#idproyecto").text();
    var aux = "arrow_drop_down";
    var aux2 = texto.length -aux.length;
    $("#miembros-proyecto").html($texto.substring(0,aux2));
  });
});
