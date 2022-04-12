//DEPENDÊNCIAS
const mongoose = require('mongoose')

//mongoose.connect('mongodb+srv://dev:aFj3UZRYSGifbeub@cluster0.mzipn.mongodb.net/RPG_Republic_PRD?retryWrites=true&w=majority')

mongoose.connect('mongodb://localhost:27017/RPG_Republic_HMG_local')



//var connectionString = process.env.URLDataBaseConcetion;
mongoose.connect('mongodb+srv://dev:aFj3UZRYSGifbeub@cluster0.mzipn.mongodb.net/RPG_Republic_PRD?retryWrites=true&w=majority');

mongoose.connect(connectionString);

//mongoose.Promise = global.Promise

module.exports = mongoose