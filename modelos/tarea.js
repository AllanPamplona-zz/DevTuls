module.exports = function(mongoose){
    var Schema = mongoose.Schema;
    var TareaSchema = new Schema({
        contenido: String,
        fecha: Date,
        estado: String,
        id_usuario: String
    });
    return mongoose.model('Tarea', TareaSchema);
}
