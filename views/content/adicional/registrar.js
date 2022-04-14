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
                debugger;
                alert("Usuario Cirado com Sucesso" + retorno);
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
        debugger;
        return dto;
    };

    return {
        registrar: registrar,
        controles: controles,
    };

}();