const schemaIten = require('../models/item');

var iten = function () {

    var listaItems = async () => {
        let listaitem = await schemaIten.find().exec();
        if (!listaitem) return { error: "Erro ao consultar itens" };        
        return listaitem;
    };

    var listaItemsPorTipo = async (tipo) => {
        let listaitem = await schemaIten.find({ tipo }).exec();
        if (!listaitem) return { error: "Erro ao consultar itens" };        
        return listaitem;
    };

    return {
        listaItemsPorTipo: listaItemsPorTipo,
        listaItems: listaItems,
    }
}();

module.exports = iten;