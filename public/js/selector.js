var urlG = "localhost:3030"
$("#selectorid").click(function(){
    var data = $('#listaselector option:selected').val();
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

$(document).ready(function(){
  var texto;
  $('.modal').modal();
});
