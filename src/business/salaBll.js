const schemaSala = require('../models/sala');

var sala = function () {
    var listaSala = function () {
        let listaSala = [{
            idSala: 5,
            descricao: "Sala1",
            usuarioMestre: {
                login: "Adm",
                icon: "../aditional/Icon/IconeCaveira.png"
            },
            listaUsuario: [{
                login: "Clebinho123",
                icon: "../aditional/Icon/IconeEspadaFogo.jpg"
            },
            {
                login: "20Derrotar",
                icon: "../aditional/Icon/IconeEspadaFogo.jpg"
            }],
            senha: "123"
        }
        ];

        return listaSala;
    };

    var getSala = function (idSalaPesquisa) {
        let sala = listaSala().find(sala => sala.idSala == idSalaPesquisa);
        return sala;
    };

    var salvarSala = function () {

    };

    return {
        listaSala: listaSala,
        getSala: getSala,
        salvarSala: salvarSala
    }
}();

module.exports = sala;