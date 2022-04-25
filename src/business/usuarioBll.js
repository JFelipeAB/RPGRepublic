const schemaUsuario = require('../models/Usuario');

var usuario = function () {

    var getUsuario = async (eMail, senha) => {
        let usuario = await schemaUsuario.findOne({ eMail }).exec();
        if (!usuario) return { error : "E-mail não encontrado!" };
        if (usuario.senha != senha) return { error: "Usuário ou senha inválidos!" };
        return usuario;
    };

    var salvarUsuario = async (usuario) => {        
        if (!usuario._id) { //Novo
            schemaUsuario.find({ email }, (erro, usuario) => {
                if (erro) return { error: "Erro ao consultar usuário" };
                if (usuario) return { error: "Usuário já existe" };
                schemaUsuario.create({ email, senha, usuario }, (erro, usuario) => {
                    if (erro) return { error: "Erro ao criar novo usuário" };
                    return { usuario };
                });
            });
        } else { //Alterar            
            return usuario;
        }
    };

    return {
        getUsuario: getUsuario,
        salvarUsuario: salvarUsuario
    }
}();

module.exports = usuario;