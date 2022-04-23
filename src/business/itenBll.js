const schemaIten = require('../models/item');

var iten = function () {
     var listaItemsPorTipo = async (tipo) => {
        schemaIten.find({tipo: "icone"}, function(err, listaitem) {
            console.log(listaitem);
            return listaitem;
        });
     };
    
    return{
        listaItemsPorTipo: listaItemsPorTipo,
    }
}();

module.exports = iten;