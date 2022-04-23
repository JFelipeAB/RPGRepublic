const schemaIten = require('../models/item');

var iten = function () {

    var listaItemsPorTipo = async (tipo) => {
        let listaitem = await schemaIten.find({ tipo }).exec();
        if (!listaitem) return { error: "Erro ao consultar itens" };        
        return listaitem;
    };

    return {
        listaItemsPorTipo: listaItemsPorTipo,
    }
}();

module.exports = iten;