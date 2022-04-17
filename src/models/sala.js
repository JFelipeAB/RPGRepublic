const mongoose = require('../database')

const schemaSala = new mongoose.Schema({

    nome: {
        type: String,
        required: true, 


    },
  
})



const sala = mongoose.model('sala', schemaSala)

module.exports = sala