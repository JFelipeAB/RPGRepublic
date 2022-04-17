var usuario = JSON.parse(localStorage.getItem('usuario'));
if (!usuario) self.location = './';

$(document).ready(function () {     
    $('#aUsuario').append(usuario.Login + ' Nvl ' + usuario.Nivel);
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
