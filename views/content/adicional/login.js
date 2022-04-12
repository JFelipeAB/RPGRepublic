var login = function(){

    var logar = function(){
        debugger;
        if (validaUsuario()) {
            $.ajax({
                url: "entrar",
                contentType: 'aplication/json',
                data: JSON.stringify({"teste": "teste"}),
                method: 'POST',
                async: true
            }).done(function (retorno) {
                debugger;
                if(retorno.error)
                {
                    alert("Login invalido");
                    return
                }
                else{
                    localStorage.removeItem('usuario')
                    localStorage.setItem('usuario', JSON.stringify(retorno.usuario));
                    self.location = './home';    
                }
            }).fail(function () {
                debugger;
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