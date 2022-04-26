const schemaSala = require('../models/sala');

var sala = function () {
    
    var listaSala = async () => {
        let listaSala = await schemaUsuario.find().exec();
        if (!listaSala) return { error : "Salas não encontradas!" };        
               
        // let listaSala = [{
        //     idSala: 5,
        //     descricao: "Sala1",
        //     usuarioMestre: {
        //         login: "Adm",
        //         icon: "../aditional/Icon/IconeCaveira.png"
        //     },
        //     listaUsuario: [{
        //         login: "Clebinho123",
        //         icon: "../aditional/Icon/IconeEspadaFogo.jpg"
        //     },
        //     {
        //         login: "20Derrotar",
        //         icon: "../aditional/Icon/IconeEspadaFogo.jpg"
        //     }],
        //     senha: "123",
        //     chatLog : ""
        // }
        // ];
        
        return listaSala;
    };

    var getSala = async (idSala) => {        
        let sala = await schemaUsuario.findOne({ idSala }).exec();
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