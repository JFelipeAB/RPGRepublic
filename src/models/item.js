const mongoose = require('mongoose')
//const bcrypt = require('bcryptjs')

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


const Item = mongoose.model('Item', schemaItem)

module.exports = Item