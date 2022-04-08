//DEPENDÊNCIAS
const mongoose = require('mongoose')

var connectionString = process.env.URLDataBaseConcetion;

mongoose.connect(connectionString);

//mongoose.Promise = global.Promise

module.exports = mongoose