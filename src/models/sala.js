const mongoose = require('../database');

const schemaSala = new mongoose.Schema({
    idSala: {
        type: Number,
            
    },    
    descricao: {
        type: String,
        required: true, 
        unique: true,
    },
    senha: {
        type: String,
        required: true,       
    },
    usuarioMestre: {
        login:{
            type: String,
            required: true,  
        },
        icon:{
            type: String,
            required: true,  
        }
    },
    listaUsuario: [{
        login:{
            type: String,
            required: true,  
        },
        icon:{
            type: String,
            required: true,  
        }
    }],
    chatLog: {
        type: String,
    },
    createdAt : {
        type: Date,
        default: Date.now,
    },

  
});
const sala = mongoose.model('sala', schemaSala);
module.exports = sala;