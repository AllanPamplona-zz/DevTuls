module.exports = function(mongoose){
    var Schema = mongoose.Schema;
    var ProyectoSchema = new Schema({
        nombre: String,
        id_creador: String,
        id_pertenecientes: [String]
    });
    return mongoose.model("Proyecto", ProyectoSchema);
}
