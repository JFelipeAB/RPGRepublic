const mongoose = require('../database');
// const itenBll = require('./itenBll');

const schemaUsuario = new mongoose.Schema({
    eMail: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },

    login: {
        type: String,
        required: true,
        unique: true,
    },

    senha: {
        type: String,
        required: true,
    },

    acesso: {
        type: String,
        default: "bronze",
    },

    nivel: {
        type: Number,
        default: 1,
    },

    xP: {
        type: Number,
        default: 1,
    },

    moeda: {
        type: Number,
        default: 1,
    },

    qtdeFichas: {
        type: Number,
        default: 3,
    },
    qtdeBaus: {
        type: Number,
        default: 1,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
    
    listaIten: [
        {
            descricao: {
                type: String,
                required: true,
                unique: true,
            },
            tipo: {
                type: String,
                required: true,
            },
            cor: {
                type: String,
            }
        }
    ],

    icone: {
        type: String,
        required: true,        
    },

    textoCor: {
        type: String,
        required: true,
    },

    textoCorN: {
        type: String,
        required: true,
    },

    textoFonte: {
        type: String,
        required: true,
    },
});
const Usuario = mongoose.model('usuario', schemaUsuario);
module.exports = Usuario;