const mongoose = require('../database')

const schemaUsuario = new mongoose.Schema({ 
   
    Login: {
        type: String,
        required: true, 
    },    

    Senha: {
        type: String,
        required: true,        
    },

    Nivel: {
        type: Number,
        default: 1,
        
    },

    eMail: {
        type: String,
        required: true, 
        unique: true,
        lowercase: true,
    },

    Moeda: {
        type: Number,
    },

    Acesso: {
        type: Number,        
    },

    createdAt : {
        type: Date,
        default: Date.now,
    }    
})

const Usuario = mongoose.model('Usuario', schemaUsuario)

module.exports = Usuario