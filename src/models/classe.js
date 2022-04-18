const mongoose = require('../database');

const schemaClasse = new mongoose.Schema({
    descricao: {
        type: String,
        required: true, 
        unique: true,
    }
});
const classe = mongoose.model('classe', schemaClasse);
module.exports = classe;