//DEPENDÊNCIAS
const mongoose = require('mongoose')

//var connectionString = process.env.URLDataBaseConcetion;
mongoose.connect('mongodb+srv://dev:aFj3UZRYSGifbeub@cluster0.mzipn.mongodb.net/RPG_Republic_PRD?retryWrites=true&w=majority');

mongoose.connect(connectionString);

//mongoose.Promise = global.Promise

module.exports = mongoose