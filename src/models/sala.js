const mongoose = require('../database');

const schemaSala = new mongoose.Schema({
    descricao: {
        type: String,
        required: true, 
        unique: true,
    },
    createdAt : {
        type: Date,
        default: Date.now,
    }   
  
});
const sala = mongoose.model('sala', schemaSala);
module.exports = sala;