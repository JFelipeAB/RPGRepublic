const mongoose = require('mongoose');

const schemaItem = new mongoose.Schema({ 
    
    Descricao: {
        type: String,
        required: true, 
        unique: true,
    },  
    tipo : {
        type: String,
        required: true,        
    },
    cor : {
        type: String,       
    }
});
const item = mongoose.model('item', schemaItem);
module.exports = item;