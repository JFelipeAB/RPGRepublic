/* const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser')
//require('./database');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false}))
app.use(routes);

require('./controllers/autenticacaoController')(app)


app.listen(3333, ()=>{
    console.log('Server no ar')
}) */


const express = require ('express');
const expressLayouts = require('express-ejs-layouts')
const app = express();
const path = require('path');
const router = express.Router();
const schemaUsuario = require('./src/models/Usuario')
const schemaItem = require('./src/models/item');
const mongoose = require('./src/database/index');
const jwt = require('jsonwebtoken');

//const { default: mongoose } = require('mongoose');


app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(expressLayouts)
//app.set('layout', './layouts/layoutHome.ejs')
app.set('view engine', 'ejs')

router.get('/', function(req,res){

    res.render(path.join(__dirname + '/views/home.ejs'), { title: 'Home', layout: './layoutHome.ejs' })

})

router.get('/login', function(req,res){

    res.render(path.join(__dirname + '/views/login.ejs'), { title: 'Login', layout: './layoutHome.ejs' })

})

router.post('/entrar', async (req, res) =>{
    const { eMail, Senha } = req.body

    const usuario = await schemaUsuario.findOne({ eMail }).select('+Senha')
    if (!usuario) {
        res.status(400).send({ error: 'Usuário não encontrado' })
    }

    if (!await bcrypt.compare(Senha, usuario.Senha)) {
        res.status(400).send({ error: 'Usuário ou senha inválidos! ' })
    }

    usuario.Senha = undefined

    const token = jwt.sign({ id: usuario.id }, autenticacaoConfig.secret, { expiresIn: 86400 })

    res.send({ usuario, token })

})


router.get('/sobre', function(req,res){

    res.render(path.join(__dirname + '/views/sobre.ejs'), { title: 'Sobre', layout: './layoutHome.ejs' })

})

router.get('/registrar', function(req,res){

    res.render(path.join(__dirname + '/views/registrar.ejs'), { title: 'Registrar', layout: './layoutHome.ejs' })

})

router.get('/game', function(req,res){

    res.render(path.join(__dirname + '/dice/dice/game.ejs'), { title: 'Game', layout: './layoutHome.ejs' })

})

router.get('/sala', function(req,res){

    res.render(path.join(__dirname + '/views/sala.ejs'), { title: 'Game', layout: './layoutHome.ejs' })

})

async function getAllItems () {
    let lista  = await schemaItem.find()
    let numeroItens = lista.count()
    let item =floor(Math.random() * (numeroItens))
    res.render(path.join(__dirname + '/views/recompensas.ejs'), { title: 'Recompensas', layout: './layoutHome.ejs' , lista: lista})
}


//getAllItems()


router.get('/recompensas', getAllItems)

router.post('/salvarUsuario', (req, res) => {

    //DESTRUCT, EXTRAIR PROPRIEDADE DE UM OBJETO PARA VARIÁVEIS
    const { dto } = req.body;

    if(!dto) res.send("Dados insuficientes!");

    //CASO O NOME DA PROPRIEDADE DE CONSULTA SEJA IGUAL AO NOME DE UMA VARÍAVEL
    //NÃO É NECESSÁRIO REPETI-LA: EX: email: email
    schemaUsuario.find({email}, (erro, usuario) => {

        if(erro) res.send("Erro ao consultar usuário");

        if(usuario) res.send("Usuário já existe");        

        schemaUsuario.create({email, senha, usuario}, (erro, usuario) => {

            if(erro) res.send("Erro ao criar novo usuário");
                      
            res.send({
                usuario,
                token: criaTokenUsuario(usuario.id)
            });
            
        })
    })
    
    res.send("Método post USUARIOS funcionando corretamente");
})

router.post('/modalDados', function(req, res){
    res.render(path.join(__dirname + '/views/dice/dice/game.ejs'), { title: 'Dados', layout: './layoutModal.ejs' })   
})

router.get('/Dados', function(req, res){
    res.render(path.join(__dirname + '/views/dice/dice/game.ejs'), { title: 'Dados', layout: './layoutHome.ejs' })   
})


app.use(express.static( __dirname + '/views/'));
// app.use(express.static( __dirname + '/views/dice/'));
// app.use(express.static( __dirname + '/views/dice/dice/'));


const server = require('http').createServer(app);
const io = require ('socket.io')(server);

io.on('connection', socket => {
    console.log('Novo Usuario Conectado: ${socket.id}');
});

app.use('/', router);
app.listen(process.env.port || 3333, () =>{
    //mongoose.connect('mongodb+srv://dev:aFj3UZRYSGifbeub@cluster0.mzipn.mongodb.net/RPG_Republic_PRD?retryWrites=true&w=majority')
    mongoose.connect('mongodb://localhost:27017/RPG_Republic_HMG_local')

});

schemaItem.count().then(items =>{
    console.log(items)
}).catch(err =>{console.log(err)})


/* schemaItem.count().then(items =>{
    console.log(items)
}).catch(err =>{console.log(err)}) */





console.log("Server rodando, listening at http://localhost:3333")