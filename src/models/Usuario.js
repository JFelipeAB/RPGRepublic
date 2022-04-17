const mongoose = require('../database')

const schemaUsuario = new mongoose.Schema({ 
   
    login: {
        type: String,
        required: true, 
    },    

    senha: {
        type: String,
        required: true,        
    },

    nivel: {
        type: Number,
        default: 1,
        
    },

    eMail: {
        type: String,
        required: true, 
        unique: true,
        lowercase: true,
    },

    moeda: {
        type: Number,
    },

    acesso: {
        type: Number,        
    },

    createdAt : {
        type: Date,
        default: Date.now,
    }    
})

const Usuario = mongoose.model('usuario', schemaUsuario)

module.exports = Usuario