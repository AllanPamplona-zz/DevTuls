module.exports = function(mongoose){
    var Schema = mongoose.Schema;
    var TareaSchema = new Schema({
        contenido: String,
        fecha: {type: Date, default: Date.now},
        estado: String,
        id_usuario: String,
        id_proyecto: String
    });
    return mongoose.model('Tarea', TareaSchema);
}
