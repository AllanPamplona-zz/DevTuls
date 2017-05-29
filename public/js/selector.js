var urlG = "localhost:3030"
$("#selectorid").click(function(){
    var data = $('#listaselector option:selected').val();
    if(data=="disable"){
        return
    }
    $.ajax({
        url: 'http://'+urlG+'/seleccionado',
        data: {dato:data},
        method: 'POST'
    }).then(function(data){
        window.location.href = data.redirect;
    }).catch(function(err){
        console.error(err)
    });
});
$("#close").click(function(){
    $("#coleccion").empty();
    $("#nombre").val('');
    $("#email").val('');
})
$("#añadir").click(function(){
    var pertenece = $("#coleccion li");
    var nombre = $('#nombre').val();
    var pertearray = []
    if(nombre.length == 0){
        alert("Debe ingresar un nombre")
    }
    else{
        pertenece.each(function(idx,li){
            pertearray.push($(li).attr('value'))
        });
        $.ajax({
            url:'http://'+urlG+'/agregarproyecto',
            data: {nombre:nombre, pertenece:pertearray},
            method:'POST'
        }).then(function(data){
            if(data.resultado=="1"){
                alert("Se guardo con exito")
                $('#modal1').modal('close');    
                $("#coleccion").empty();
                $("#nombre").val('');
                $("#email").val('');
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
$("#agregar").click(function(){
    var data = $('#email').val();
    if(data.length==0){
        return
    }
    $.ajax({
        url: 'http://'+urlG+'/validaremail',
        data: {email:data},
        method: 'POST'
    }).then(function(data){
        if(data.resultado == "1"){
            agregar(data.usuario)
        }else{
            if(data.resultado == "0"){
                alert("El usuario no se encuentra en el sistema")
            }
        }
    }).catch(function(err){
        console.error(err)
    });
});

function agregar(json){
    if($('#'+json[0]._id).length==0){
        $("#coleccion").append('<li id='+json[0]._id+' value='+json[0]._id+'><div>'+json[0].name+'</div></li>')
    }
    else{
        alert("El usuario ya se encuentra en el proyecto")
    }
}

$(document).ready(function(){
  var texto;
  $('.modal').modal();
});
