const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const path = require('path');
const router = express.Router();
const usuarioBll = require('./src/business/usuarioBll');
const salaBll = require('./src/business/salaBll');
const itenBll = require('./src/business/itenBll');
const racaBll = require('./src/business/racaBll');
const classeBll = require('./src/business/classeBll');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressLayouts);
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/src/'));
app.use(express.static(__dirname + '/views/'));

const http = require('http');
const server = http.createServer(app);
const socketIo = require('socket.io')(http)
const io = socketIo.listen(server);
app.use('/', router);
//server.use('/', router);


server.listen(process.env.port || 3333);
console.log("Server rodando, listening at http://localhost:3333");


router.get('/', function (req, res) {
    res.render(path.join(__dirname + '/views/login.ejs'), {
        title: 'Login',
        layout: './layoutBase.ejs'
    });
});

router.get('/login', function (req, res) {
    res.render(path.join(__dirname + '/views/login.ejs'), {
        title: 'Login',
        layout: './layoutBase.ejs'
    });
});

router.get('/registrar', function (req, res) {
    res.render(path.join(__dirname + '/views/registrar.ejs'), {
        title: 'Registrar',
        layout: './layoutBase.ejs'
    });
});

router.get('/info', function (req, res) {
    res.render(path.join(__dirname + '/views/sobre.ejs'), {
        title: 'Sobre',
        layout: './layoutBase.ejs'
    });
});

router.get('/home', async (req, res) => {    
    res.render(path.join(__dirname + '/views/home.ejs'), {
        title: 'Home',
        layout: './layoutHome.ejs',
        listaSalas: await salaBll.listaSala()
    });
});

router.get('/sala', async (req, res) => {  
    res.render(path.join(__dirname + '/views/sala.ejs'), {
        title: 'Game',
        layout: './layoutHome.ejs',
        sala: await salaBll.getSala(req.query.id)
    });
});

router.get('/sobre', function (req, res) {
    res.render(path.join(__dirname + '/views/sobre.ejs'), {
        title: 'Sobre',
        layout: './layoutHome.ejs'
    });
});

router.get('/recompensa', async (req, res) => {    
    res.render(path.join(__dirname + '/views/recompensa.ejs'), {
        listaIten: await itenBll.listaItems(),
        title: 'Recompensa',
        layout: './layoutHome.ejs'
    });
});

router.get('/loja', function (req, res) {
    res.render(path.join(__dirname + '/views/loja'), {
        title: 'Loja',
        layout: './layoutHome.ejs'
    });
});

router.get('/perfil', function (req, res) {
    res.render(path.join(__dirname + '/views/perfil'), {
        title: 'Perfil',
        layout: './layoutHome.ejs'
    });
});

router.get('/ficha', function (req, res) {
    res.render(path.join(__dirname + '/views/ficha'), {
        title: 'Fichas',
        layout: './layoutHome.ejs'
    });
});

router.post('/entrar', async (req, res) => {
    const usuario = await usuarioBll.getUsuario(req.body.email, req.body.senha);    
    if (usuario.error) return res.send({ error: usuario.error });    
    return res.send({ usuario });
});

router.post('/salvarUsuario', async (req, res) => {    
    const usuario = await usuarioBll.salvarUsuario(req.body);
    if (usuario.error) return res.send({ error: usuario.error });    
    return res.send({ usuario });
});

router.post('/salvarSala', (req, res) => {
    var dto = req.body;    
    if (!dto) {
        return res.send(null);
    }
    return res.send({ resultado: 2 });

});


io.on('connection', (socket) => {       
    socket.on('connection', (mensagem) => {      
        io.emit('resp', mensagem)
    });

    // socket.on('disconnect', (mensagem) => {      
    //     console.log(mensagem);
    //     io.emit('resp', mensagem)

    // });
});

app.use(express.static(__dirname + 'public'))



