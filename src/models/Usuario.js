const mongoose = require('../database')

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

    acesso : {
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

    createdAt : {
        type: Date,
        default: Date.now,
    }    
});
const Usuario = mongoose.model('usuario', schemaUsuario);
module.exports = Usuario;