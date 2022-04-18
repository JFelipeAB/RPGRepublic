const schemaRaca = require('../models/raca');

var raca = function () {

    var listaRaca = function () {
        var returno = [
            {
                "descricao" : "Humanos"
            },
            {
                "descricao" : "Elfos"
            },
            {
                "descricao" : "Anões"
            },
            {
                "descricao" : "Orcs"
            },
            {
                "descricao" : "Goblin"
            },
            {
                "descricao" : "Metamorfos"
            }];
        return returno
    };

    return {
        listaRaca: listaRaca
    }
}();

module.exports = raca;