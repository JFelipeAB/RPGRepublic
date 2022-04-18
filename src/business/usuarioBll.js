const schemaUsuario = require('../models/Usuario');

var usuario = function (){
    var getUsuario = async(eMail) =>{        
        let usuario = await schemaUsuario.findOne({ eMail }).exec();        
       return usuario;
    }

    var salvarUsuario = async(usuario) =>{

    }

    return{
        getUsuario : getUsuario,
        salvarUsuario: salvarUsuario
    }
}();

module.exports = usuario;