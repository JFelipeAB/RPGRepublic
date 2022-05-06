var registrar = function () {

    var registrar = function () {         
        if (validaUsuario()) {
            $.ajax({
                url: "salvarUsuario",
                contentType: 'application/json',
                data: JSON.stringify(getDto()),
                method: 'POST',
                async: true
            }).done(function (retorno) {                
                if(retorno.error)
                {
                    alert(retorno.error);
                    $('#txtUSerEmail').val("");
                    $('#txtUserSenha').val("");
                    $('#txtUSerEmail').val("");
                    $('#txtUserRepetirSenha').val("");
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
    };

    var validaUsuario = function () {        
       return true;

    };

    var getDto = function () {
        var dto = {
            'senha': $('#txtUserSenha').val(),
            'usuario': $('#txtUSerName').val(),
            'email': $('#txtUSerEmail').val(),
        };        
        return dto;
    };

    return {
        registrar: registrar,
        controles: controles,
    };

}();