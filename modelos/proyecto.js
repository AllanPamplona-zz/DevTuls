module.exports = function(mongoose){
    var Schema = mongoose.Schema;
    var TareaSchema = new Schema({
        id_creador: String,
        id_pertenecientes: [String]
    });

