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
                debugger;
                if (retorno.error) {
                    alert(retorno.error);
                    $('#txtUSerEmail').val("");
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
        debugger;
        let userName = $('#txtUSerEmailAnonimo').val();
        if (userName) {
            let usuarioAnonimo = { 
                _id: "anonimo", 
                eMail: "loginAnonimo@", 
                createdAt: "2022-03-11T01:03:52.548Z", 
                acesso: "bronze", 
                listaFIcha: [], 
                listaIten: [{ tipo: "icone", descricao: "../aditional/Icon/IconeCaveira.png" }],
                qtdeFichas: 1, 
                icon: "../aditional/Icon/IconeCaveira.png", 
                login: userName, 
                moeda: 0, 
                nivel: 0, 
                senha: "123", 
                xP: 0, 
                qtdeBaus: 1,
                anonimo: true
            }
            localStorage.removeItem('usuario');
            localStorage.setItem('usuario', JSON.stringify(usuarioAnonimo));
            self.location = './home';
        }
    }

    return {
        logar: logar,
        logarAnonimo: logarAnonimo
    }
}();