
var home = function () {
    var controles = function () {
        return {
            TxtSala: "#txtSala",
        }

    };

    var validaEntrarSala = function () {
        if (validaSala($("#txtSala").val())) {

            window.location.href = "/sala.html";
        }
        else {
            alert("Sala Inexistente");
        }
    };

    var validaSala = function (sala) {
        debugger;
        if (sala ) {
            return true;
        }
        else {
            return false;
        }
    };

    var criarSala = function () {

        $.ajax({
            url: "criarSala",
            contentType: 'aplication/json',
            data: JSON.stringify(getDtoCriarSala()),
            method: 'POST',
            async: true
        }).done(function (retorno) {
            debugger;
            self.location='./sala' + retorno.idSala
        }).fail(function () {
            alert("Falha na conexão com servidor");
        }) 



        window.location.href = "/sala.html";
    };

    var modalNovaSala = function(){
        
    }

    var entrarSala = function(idSala, senha)
    {
        debugger;
        if(!senha)
            window.location='./sala?id='+ idSala;
             

    }

    var getDtoCriarSala = function () {
        var dto = {
            'nome': $('#txtSalaNome').val(),
            'senha': $('#txtSalaSenha').val(),
        };
        debugger;
        return dto;
    };

    return {
        entrarSala: entrarSala,
        criarSala: criarSala,
        validaEntrarSala: validaEntrarSala
    };
}();