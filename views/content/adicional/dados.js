var usuario = JSON.parse(localStorage.getItem('usuario'));
if (!usuario) self.location = './';
var usurName = usuario.login;
var usurImg = '<img class="IconMensage" src="' + usuario.icone + '" alt="user">';
var socket;

$(document).ready(function () {
    sala.configSocket();
    sala.configGeral();
});

var sala = function () {

    var configGeral = function () {        
        $('.textoEditavel').css("color", usuario.textoCorN);
        $('.textoEditavel').css("font-family", usuario.textoFonte); 
    }

    var configSocket = function () {
        socket = io.connect('https://rpgrepublic.jfelipeab.repl.co');
        //socket = io.connect('http://localhost:3333');
        socket.on('resp', (retorno) => {           
        });        
    };
    
    var adicionarMensagem = function (text) {       
        if (text)
            socket.emit("connection", `<div style="font-family:${usuario.textoFonte}; color:${usuario.textoCorN}"` +
                `class="textoEditavel">${usurImg}<strong>${usurName}</strong>: ${text}</div><hr>`);
        else {
            if (GetMensagem())
                socket.emit("connection", `<div style="font-family:${usuario.textoFonte}; color:${usuario.textoCorN}"` +
                    `class="textoEditavel">${usurImg}<strong>${usurName}</strong>: ${GetMensagem()}</div><hr>`);
            $("#txtText").val("");
        };
    };

    var GetMensagem = function () {
        return $("#txtText").val();
    };
   
    return {
        adicionarMensagem: adicionarMensagem,        
        configSocket: configSocket,
        configGeral: configGeral,       
    };
}();