const schemaSala = require('../models/room');

var sala = function () {
    var listaSala = function () {
        let listaSala = [{
            idSala: 5,
            descricao: "Sala1",
            usuario: {
                idUsuario: "1",
                nome: "Usuario123"
            },
            senha: "123"
        }
        ];

        return listaSala;
    };

    var getSala = function (idSalaPesquisa) {        
        let sala = listaSala().find(sala => sala.idSala == idSalaPesquisa);
        return sala;
    };

    var salvarSala = function (){

    };

    return {
        listaSala: listaSala,
        getSala: getSala,
        salvarSala: salvarSala
    }
}();

module.exports = sala;