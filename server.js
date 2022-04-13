const express = require('express');
const expressLayouts = require('express-ejs-layouts')
const app = express();
const path = require('path');
const router = express.Router();
const schemaUsuario = require('./src/models/Usuario')
const schemaItem = require('./src/models/item');
const mongoose = require('./src/database/index');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(expressLayouts)
app.set('view engine', 'ejs')

//CLASSES

var sala = function () {
    var listaSalas = function () {
        var retorno = [{
            idSala: 5,
            descricao: "Sala1",
            usuario: {
                idUsuario: "1",
                nome: "Usuario123"
            },
            senha: "123"
        },
        {
            idSala: 3,
            descricao: "Sala12",
            usuario: {
                idUsuario: "1",
                nome: "Usuario123"
            },
            senha: "123"
        },
        {
            idSala: 2,
            descricao: "RPGFriends",
            usuario: {
                idUsuario: "2",
                nome: "Moe"
            },
            senha: null
        },
        {
            idSala: 1,
            descricao: "RPGTeste",
            usuario: {
                idUsuario: "1",
                nome: "Usuario123"
            },
            senha: null
        },
        {
            idSala: 3,
            descricao: "Sala12",
            usuario: {
                idUsuario: "1",
                nome: "Usuario123"
            },
            senha: "123"
        },
        {
            idSala: 10,
            descricao: "RPGdeTerror",
            usuario: {
                idUsuario: "2",
                nome: "Moe"
            },
            senha: null
        },
        {
            idSala: 1,
            descricao: "RPGSalaJogo",
            usuario: {
                idUsuario: "1",
                nome: "Usuario123"
            },
            senha: null
        },
        ];

        return retorno;
    };

    var getSala = function (idSalaPesquisa) {        
        return listaSalas().find(sala => sala.idSala == idSalaPesquisa);
    };

    var salvarSala = function (){

    };


    return {
        listaSalas: listaSalas,
        getSala: getSala,
        salvarSala: salvarSala
    }
}();



// var a ={
//     ...usuario.getUsuario(),  //FUSAO DE OBJETOS
// }

var usuario = function (){
    var getUsuario = function(){
        return {
            IdUsuario: 1,
            Login: "Usuario123",
            senha: "email",
            Acesso:{

            },
            listaItens:[
                {
                    Descricao: "Icon|https://avatars.dicebear.com/api/avataaars/uash.svg"
                },{

                },{

                }
            ]

        }
    }
}();

//ROTAS GET

router.get('/home', function (req, res) {

    res.render(path.join(__dirname + '/views/home.ejs'), { title: 'Home', layout: './layoutHome.ejs', listaSalas: sala.listaSalas() })

})

router.get('/', function (req, res) {

    res.render(path.join(__dirname + '/views/login.ejs'), { title: 'Login', layout: './layoutBase.ejs' })

})

router.post('/entrar', async (req, res)  =>{
    dto = req.body;
    
    let eMail = dto.email;
    let Senha = dto.senha;
    const usuario = await schemaUsuario.findOne({ eMail }).exec();
    console.log(usuario);
    if (!usuario ) {
        res.send({ error: "E-mail não encontrado!" });
    }
    
    if (usuario.Senha != Senha ) {
        res.send({ error: "Usuário ou senha inválidos!" });
    }
    // if (!await bcrypt.compare(Senha, usuario.Senha)) {
    //     res.send({ error: 'Usuário ou senha inválidos! ' })
    // }
    // const token = jwt.sign({ id: usuario.id }, autenticacaoConfig.secret, { expiresIn: 86400 })
    // console.log(token);
    
    res.send({ usuario });
})


router.get('/sobre', function (req, res) {

    res.render(path.join(__dirname + '/views/sobre.ejs'), { title: 'Sobre', layout: './layoutHome.ejs' })

})

router.get('/registrar', function (req, res) {

    res.render(path.join(__dirname + '/views/registrar.ejs'), { title: 'Registrar', layout: './layoutBase.ejs' })

})

router.get('/game', function (req, res) {

    res.render(path.join(__dirname + '/views/dice/dice/game.ejs'), { title: 'Game', layout: './layoutHome.ejs' })

})

router.get('/sala', function (req, res) {    
    var idSala = req.query.id;    
    res.render(path.join(__dirname + '/views/sala.ejs'), { title: 'Game', layout: './layoutHome.ejs', sala: sala.getSala(idSala) })

})

router.post('/salvarSala', (req, res) => {
    var dto = req.body;
    console.log(dto);
    if(!dto){
        res.send(null);
    }
    res.send({ resultado: 2});
    
})

async function getAllItems () {
    let lista  = await schemaItem.find()
    let numeroItens = lista.count()
    let item =floor(Math.random() * (numeroItens))
    res.render(path.join(__dirname + '/views/recompensas.ejs'), { title: 'Recompensas', layout: './layoutHome.ejs' , lista: lista})
}


//getAllItems()


router.get('/recompensas', getAllItems)

app.post('/salvarUsuario', (req, res) => {

    //DESTRUCT, EXTRAIR PROPRIEDADE DE UM OBJETO PARA VARIÁVEIS
    const { dto } = req.body;    
    if (!dto) res.send("Dados insuficientes!");

    //CASO O NOME DA PROPRIEDADE DE CONSULTA SEJA IGUAL AO NOME DE UMA VARÍAVEL
    //NÃO É NECESSÁRIO REPETI-LA: EX: email: email
    schemaUsuario.find({ email }, (erro, usuario) => {

        if (erro) res.send("Erro ao consultar usuário");

        if (usuario) res.send("Usuário já existe");

        schemaUsuario.create({ email, senha, usuario }, (erro, usuario) => {

            if (erro) res.send("Erro ao criar novo usuário");

            res.send({
                usuario,
                token: criaTokenUsuario(usuario.id)
            });

        })
    })

    res.send("Método post USUARIOS funcionando corretamente");
})

router.post('/modalDados', function (req, res) {
    res.render(path.join(__dirname + '/views/dice/dice/game.ejs'), { title: 'Dados', layout: './layoutModal.ejs' })
})

router.get('/Dados', function (req, res) {
    res.render(path.join(__dirname + '/views/dice/dice/game.ejs'), { title: 'Dados', layout: './layoutHome.ejs' })
})


app.use(express.static(__dirname + '/views/'));
// app.use(express.static( __dirname + '/views/dice/'));
// app.use(express.static( __dirname + '/views/dice/dice/'));


const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on('connection', socket => {
    console.log('Novo Usuario Conectado: ${socket.id}');
});

app.use('/', router);
app.listen(process.env.port || 3333, () =>{
    //mongoose.connect('mongodb+srv://dev:aFj3UZRYSGifbeub@cluster0.mzipn.mongodb.net/RPG_Republic_PRD?retryWrites=true&w=majority')
    // mongoose.connect('mongodb://localhost:27017/RPG_Republic_HMG_local')

});

// schemaItem.count().then(items =>{
//     console.log(items)
// }).catch(err =>{console.log(err)})


console.log("Server rodando, listening at http://localhost:3333")