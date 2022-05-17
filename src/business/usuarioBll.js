const schemaUsuario = require('../models/Usuario');
var contadorAnonimo = 0;
var usuario = function () {

    var getUsuario = async (eMail, senha) => {
        let usuario = await schemaUsuario.findOne({ eMail }).exec();
        if (!usuario) return { error: "E-mail não encontrado!" };
        if (usuario.senha != senha) return { error: "Usuário ou senha inválidos!" };
        return usuario;
    };

    var salvarUsuario = async (usuario) => {
        if (usuario.anonimo) { //Login anonimo           
            if (usuario._id)
                return usuario;
            else
                return montaUsuario(usuario)
        }
        if (usuario._id) {
            let retorno = await schemaUsuario.findByIdAndUpdate(usuario._id, usuario);
            if (!retorno) return { error: "ERRO! Alterações não salvas no usuario!" };
            return usuario;
        } else {      //Novo    
            var usuario = montaUsuario(usuario);
            const usuarioNovo = new schemaUsuario(usuario);            
            usuarioNovo.save();
            return usuarioNovo;
        }
    };

    var montaUsuario = function (dados) {       
        let usuarioNovo = {
            eMail: dados.email,
            createdAt: "2022-03-11T01:03:52.548Z",
            acesso: "bronze",
            listaFicha: [],
            listaIten: [{
                tipo: "icone",
                descricao: "../aditional/Icon/IconeCaveira.png"
            }, {
                tipo: "FontFamily",
                descricao: "Arial"
            }, {
                cor: "#000000",
                descricao: "Preto",
                tipo: "FontColor"
            }
            ],
            qtdeFichas: 2,
            icone: "../aditional/Icon/IconeCaveira.png",
            textoCor: "Preto",
            textoCorN: "#000000",
            textoFonte: "Arial",
            login: dados.login,
            moeda: 0,
            nivel: 1,
            senha: dados.senha,
            xP: 0,
            qtdeBaus: 1,
        };
        if (dados.anonimo) {
            usuarioNovo.login = dados.login + "A#" + contadorAnonimo,
                usuarioNovo.anonimo = true;
            usuarioNovo._id = "A#" + contadorAnonimo;
            usuarioNovo.eMail = "A#" + contadorAnonimo;
            usuarioNovo.senha = "A#" + contadorAnonimo;
            contadorAnonimo++;
        };
        return usuarioNovo;
    };

    return {
        getUsuario: getUsuario,
        salvarUsuario: salvarUsuario
    }
}();

module.exports = usuario;