const mongoose = require('mongoose')

const schemaItem = new mongoose.Schema({ 
    
    Id_item : {
        type: Number,
        unique: true,
    },

    Descricao: {
        type: String,
        required: true, 
    },    

    CreatAt : {
        type: Date,
        default: Date.now,
    },  
    
    AlterAt : {
        type: Date,
        default: Date.now,
    } 
})


const Item = mongoose.model('item', schemaItem)

module.exports = Item