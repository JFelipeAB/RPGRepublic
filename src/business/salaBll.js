const schemaSala = require('../models/sala');

var sala = function () {
    
    var listaSala = async () => {
        let listaSala = await schemaSala.find().exec();
        if (!listaSala) return { error : "Salas não encontradas!" };  
        return listaSala;
    };

    var getSala = async (idSala) => {        
        let sala = await schemaSala.findOne({ idSala }).exec();
        if (!sala) return { error : "Sala não encontrado!" };        
        return sala;
    };

    var salvarSala = async () => {
        
    };

    return {
        listaSala: listaSala,
        getSala: getSala,
        salvarSala: salvarSala
    }
}();

module.exports = sala;