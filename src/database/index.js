//DEPENDÊNCIAS
const mongoose = require('mongoose')

//mongoose.connect(process.env.URLDataBaseConcetion);

mongoose.connect('mongodb+srv://dev:aFj3UZRYSGifbeub@cluster0.mzipn.mongodb.net/RPG_Republic_PRD?authSource=admin&replicaSet=atlas-9nw973-shard-0&w=majority&readPreference=primary&retryWrites=true&ssl=true');

//mongoose.connect('mongodb://localhost:27017/RPG_Republic_HMG_local')


module.exports = mongoose