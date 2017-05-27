var auxDrag;
var urlG = "localhost:3030"
function update(){
             $.ajax({
                url: 'http://'+urlG+'/update',
                method: 'POST'
            }).then(function(response){
                create(response);
            }).catch(function(err){
                console.error(err);
            });
        }

function create(json){
  for (var i = 0; i < tableros.length; i++) {
    $("#"+idTableros[i]+"").empty();
  }
  for (j in idTableros) {
      $("#"+idTableros[j]).append("</br></br>");
    for(i in json){
      if (idTableros[j] == json[i].estado) {
        $("#"+idTableros[j]+"").append("<div class=\"row \" id="+json[i]._id+"><div class=\"col s12\"><div class=\"card  amber accent-1 white-text\"><p class=\""+json[i]._id+"\">X</p><div class=\"contenido\">"+json[i].contenido+"</div></div></div></div>");
          $('#'+json[i]._id+'').draggable();
      }
    }
  }

$("p").click(function(){
    var myclass = {id:$(this).attr("class")};
    erase(myclass);
});
};

//Insertar nueva notas
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

//Datos de prueba para llenar las notas
var jsonp =[
  {contenido:"tablero1" ,estado:1},
  {contenido:"tablero2" ,estado:2}
];

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
update();
