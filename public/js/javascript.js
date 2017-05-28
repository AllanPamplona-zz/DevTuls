var auxDrag;
var urlG = "localhost:3030"

function update(){
    $.ajax({
        url: 'http://'+urlG+'/update',
        method: 'POST'
    }).then(function(response){
        getId(response);
    }).catch(function(err){
        console.error(err);
    });
}

function getId(res){
    $.ajax({
        url: 'http://'+urlG+'/getid',
        method: 'POST'
    }).then(function(response){
        create(res,response)
    }).catch(function(err){
        console.error(err)
    });
}

function create(json, res){
  for (var i = 0; i < tableros.length; i++) {
    $("#"+idTableros[i]+"").empty();
  }
  for (j in idTableros) {
      $("#"+idTableros[j]).append("</br></br>");
    for(i in json){
      if (idTableros[j] == json[i].estado) {
          if(res==json[i].id_usuario){
                $("#"+idTableros[j]+"").append("<div class=\"row \" id="+json[i]._id+"><div class=\"col s12\"><div class=\"card  amber accent-1 white-text\"><div><a id=\""+json[i]._id+"\" class=\"waves-effect waves-light btn nota\"> X </a></div><div class=\"contenido\">"+json[i].contenido+ "<br>" + new Date(json[i].fecha)+ "</div></div></div></div>");
          }
          else{
                $("#"+idTableros[j]+"").append("<div class=\"row \" id="+json[i]._id+"><div class=\"col s12\"><div class=\"card lime lighten-3 white-text\"><div class=\"contenido\">"+json[i].contenido+ "<br>" + new Date(json[i].fecha)+ "</div></div></div></div>");
          }
          $('#'+json[i]._id+'').draggable();
      }
    }
  }

$("a").click(function(){
    var clase = $(this).attr("class")
    if(clase.indexOf("nota")!=-1){
        var myid = {id:$(this).attr("id")};
        erase(myid);
    }
});
}
/*/Insertar nueva nots
$('#new').on('submit', function(event){
    event.preventDefault();
    var data = {
        nombre: $('#nombre').val(),
    };
    $.ajax({
        url: 'http://'+urlG+'/createtask',
        data: data,
        method: 'POST'
    }).then(function(response){
        socket.emit('update', 'updating');
    }).catch(function(err){
        console.error(err);
    });
});
*/

var socket = io.connect(urlG);
socket.on('connect', function(data){
    socket.emit('join', 'Hellow world from client');
});
socket.on('broad', function(data){
    update();
});

//Crear Tableros
var tableros = ["To do", "Doing","Finish"];
var idTableros =["to_do_it","doing","done"]

//Pone los tableros en el HTML
$(".tab").append("<div class=\"row crow\">");
for (var i = 0; i < tableros.length; i++) {
  $(".crow").append("<div class=\"col s3\"><div class=\"card orange lighten-3\"><div class=\"card-content white-text\" ><span class=\"card-title\" id=\""+tableros[i]+"\">"+tableros[i]+"</span><div class=\"row\"><div id=\""+idTableros[i]+"\" class=contai></br></br></div><div class=\"input-field col s11\"><input  id=\"nuevanota"+i+"\" class=\""+idTableros[i]+"\" type=\"text\" class=\"validate\"><label class=\"active\" for=\"nuevanota\">Nueva Nota</label></div></div></div></div></div>");
}
$(".tab").append("</div>");


$("#nuevanota0").on('keyup', function(e){
    if(e.keyCode==13){
        var comp = {
            contenido:  $("#nuevanota0").val(),
            fecha: new Date(),
            estado: "to_do_it"
        };
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
        save(comp);
    }
});
$(document).ready(function(){
  var texto;
  $("#dropdown1").click(function(e){
    texto = e.target.text;
    $("#idproyecto").html(texto + '<i class="material-icons right">arrow_drop_down</i>');
  });
  $("#idmiembros").click(function(){
    texto = $("#idproyecto").text();
    var aux = "arrow_drop_down";
    var aux2 = texto.length -aux.length;
    $("#miembros-proyecto").html(texto.substring(0,aux2));
  });
});

function save(data){
    $.ajax({
        url: "http://"+urlG+"/createtask",
        data: data,
        method: "post"
    }).then(function(response){
        socket.emit('update', "update");
    }).catch(function(err){
        console.log(err);
    });
};
function actu(data){
    $.ajax({
        url: "http://"+urlG+"/actu",
        data: data,
        method: "post"
    }).then(function(response){
        socket.emit('update','update');
    }).catch(function(err){
        console.log(err);
    });
};

function erase(data){
    $.ajax({
        url: "http://"+urlG+"/delete",
        data: data,
        dataType: 'application/json',
        method: "post"
    }).then(function(response){
        socket.emit('update','update');
    }).catch(function(err){
        socket.emit('update','update');
        console.log(err);
    });
};





//LLena el tablero con las notas
/**
for (var i = 0; i < tableros.length; i++) {
  for (var j = 0; j < jsonp.length; j++) {
    if (idTableros[i] == jsonp[j].estado) {
      $("#"+idTableros[i]+"").append("<div class=\"row arrastable\"><div class=\"col s12\"><div class=\"card  amber accent-1 white-text\"><div class=\"contenido\" id=\""+tableros[i]+"\">"+jsonp[j].contenido+"</div></div></div></div>");
    }
  }
<<<<<<< HEAD
}**/

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
