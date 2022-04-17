var login = function(){

    var logar = function(){        
        if (validaUsuario()) {
            $.ajax({
                url: "entrar",
                contentType: 'application/json',
                data: JSON.stringify(getDto()),
                method: 'POST',
                async: true
            }).done(function (retorno) {
                debugger;
                if(retorno.error)
                {
                    alert(retorno.error);
                    $('#txtUSerEmail').val("");
                    $('#txtUserSenha').val("");
                    localStorage.removeItem('usuario');               
                }
                else{
                    localStorage.removeItem('usuario');
                    localStorage.setItem('usuario', JSON.stringify(retorno.usuario));
                    self.location = './home';    
                }
            }).fail(function () {               
                alert("Falha na conexão com servidor");
            })                       
        }
        else {
            alert("Usuario Invalido");
        } 
    }

    var getDto = function () {       
        var dto = {
            'email': $('#txtUSerEmail').val(),
            'senha': $('#txtUserSenha').val(),    
        };        
        return dto;
    };

    var validaUsuario = function(){
        return true;
    }
    
    return{
        logar: logar,
    }
} ();