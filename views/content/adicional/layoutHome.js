var usuario = JSON.parse(localStorage.getItem('usuario'));
if (!usuario) self.location = './';

$(document).ready(function () { 
    $('#aUsuario').append(usuario.login + ' Nvl ' + usuario.nivel);
    $('#imgIconMenu').attr("src",usuario.icone);
});

var layoutHome = function(){
    
    var sair = function(){
        localStorage.removeItem('usuario');       
        self.location = './login'; 
    }

    return{
        sair : sair
    }
}();
