if(!global.hasOwnProperty('db')){
    // Inicia el framework para el manejo de la db
    var moongo = require("mongoose");
    // Nombre de la db (esta se creara si no la tienen en mongodb)
    var dbName = "dev_tuls";
// Coneccion a la base de datos
    moongo.connect("mongodb://localhost/"+dbName);
    
    // Variable db global para acceder desde cualquier lado
    global.db = {
        // Import el framework como objeto
        mongoose:moongo,
        Tarea: require('./tarea')(moongo),

        User: require('./user')(moongo)
    };
}
// se exporta la base de datos
//
module.exports = global.db;
