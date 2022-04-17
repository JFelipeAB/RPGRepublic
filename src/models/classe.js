const mongoose = require('../database');

const schemaRaca = new mongoose.Schema({
    descricao: {
        type: String,
        required: true, 
        unique: true,
    }
});
const raca = mongoose.model('raca', schemaRaca);
module.exports = raca;