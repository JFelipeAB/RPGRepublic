var login = function () {

    var logar = function () {
        if (validaUsuario()) {
            $.ajax({
                url: "entrar",
                contentType: 'application/json',
                data: JSON.stringify(getDto()),
                method: 'POST',
                async: true
            }).done(function (retorno) {
                if (retorno.error) {
                    alert(retorno.error);                   
                    $('#txtUserSenha').val("");
                    localStorage.removeItem('usuario');
                }
                else {
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

    var validaUsuario = function () {
        return true;
    }

    var logarAnonimo = function () {        
        let userName = $('#txtUSerEmailAnonimo').val();
        if (userName) {
            let NovousuarioAnonimo = {
                login: userName,
                anonimo: true
            };
            salvarUsuarioCompleto(NovousuarioAnonimo);            
            self.location = './home';
        }
    }

    var salvarUsuarioCompleto = function (NovousuarioAnonimo) {
        $.ajax({
            url: "salvarUsuario",
            contentType: 'application/json',
            data: JSON.stringify(NovousuarioAnonimo),
            method: 'POST',
            async: true
        }).done(function (retorno) {            
            if (retorno.error) alert(retorno.error);
            else {
                localStorage.removeItem('usuario');
                localStorage.setItem('usuario', JSON.stringify(retorno.usuario));
            }
        }).fail(function () {
            alert("Falha na conexão com servidor, suas ações não foram salvas!!");
        });
    };

    return {
        logar: logar,
        logarAnonimo: logarAnonimo
    }
}();