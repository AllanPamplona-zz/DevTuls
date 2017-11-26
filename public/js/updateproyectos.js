var URL_GLOBAL = "localhost:3030"
function updateselect(){
 $.ajax({
            url:'http://'+URL_GLOBAL+'/selecupdate',
            method:'POST'
        }).then(function(data){
            $("#listaselector").empty()
            $("#listaselector").append($('<option>').text("Choose your option").val("disable"))
            data.proy.forEach(function(x){
               $("#listaselector").append($('<option>').text(x.nombre).val(x._id))
            })
        }).catch(function(err){
            console.error(err)
        });

}
$(document).ready(function(){
    updateselect()
});
