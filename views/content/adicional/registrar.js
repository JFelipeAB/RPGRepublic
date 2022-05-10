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
       if($('#txtUserSenha').val() == $('#txtUserRepetirSenha').val())
        return true;
        else{
            alert("Senhas diferentes");
            $('#txtUserSenha').val('');
            $('#txtUserRepetirSenha').val('');
            return false;
        } ;        
    };

    var getDto = function () {
        var usuario = {
            'senha': $('#txtUserSenha').val(),
            'login': $('#txtUSerName').val(),
            'email': $('#txtUSerEmail').val(),
        };   
        return usuario;
    };

    return {
        registrar: registrar, 
    };

}();