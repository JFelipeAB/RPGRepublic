const schemaClasse = require('../models/classe');

var classe = function () {

    var listaClasse = function () {
        var returno = [
            {
                "descricao": "Guerreiro"
            },
            {
                "descricao": "Arqueiro"
            },
            {
                "descricao": "Mago"
            },
            {
                "descricao": "Assassino"
            },
            {
                "descricao": "Bruxo"
            },
            {
                "descricao": "Ladino"
            },
            {
                "descricao": "Sacerdote"
            },
            {
                "descricao": "Paladino"
            },
            {
                "descricao": "Necromante"
            },
        ];
        return returno
    };

    return {
        listaClasse: listaClasse
    }
}();

module.exports = classe;