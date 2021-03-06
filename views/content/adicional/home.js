$(document).ready(function () {
    $("#PesquisarSala").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#myTable tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });   
    $('#PesquisarSala').val('');
});

var home = function () {

    var criarSala = function () {    
        alert("Voce não pode criar uma sala ainda!")
        // $.ajax({
        //     url: "salvarSala",
        //     contentType: 'application/json',
        //     data: JSON.stringify(getDtoCriarSala()),
        //     method: 'POST',
        //     async: true
        // }).done(function (retorno) {            
        //     if (!retorno)
        //         alert("Falha interna do servidor");
        //     else {
        //         self.location = './sala?id=' + retorno.resultado;
        //     }
        // }).fail(function () {
        //     alert("Falha na conexão com servidor");
        // })
    };

    var entrarSala = function (idSala, descricaoSala, senhaSala) {
        if (!senhaSala){
            let sala = {
                id: idSala,
                senha: ""
            };
            localStorage.removeItem('sala');
            localStorage.setItem('sala', JSON.stringify(sala));
            window.location = './sala?id=' + idSala;
        }
        else {
            var modal = new bootstrap.Modal($('#mdlEntrarSala'), {
                keyboard: false
            })
            $('#hdfEntrarSalaSenha').val(senhaSala);
            $('#hdfEntrarSalaId').val(idSala);
            $('#txtEntrarSalaNome').val(descricaoSala);
            $('#txtEntrarSalaSenha').val("");
            modal.show('slow');
        };
    };

    var validaEntrarSala = function () {        
        let senha = $('#hdfEntrarSalaSenha').val();
        let senhaInserida = $('#txtEntrarSalaSenha').val();
        let idSala = $('#hdfEntrarSalaId').val();
        if (senha == senhaInserida)
        {
            let sala = {
                id: idSala,
                senha: senha
            };
            window.location = './sala?id=' + idSala;
            localStorage.removeItem('sala');
            localStorage.setItem('sala', JSON.stringify(sala));
        }
        else {
            localStorage.removeItem('sala');
            alert("Senha incorreta!");
        };
    };

    var getDtoCriarSala = function () {
        var dto = {
            'nome': $('#txtSalaNome').val(),
            'senha': $('#txtSalaSenha').val(),
        };        
        return dto;
    };

    return {
        entrarSala: entrarSala,
        criarSala: criarSala,
        validaEntrarSala: validaEntrarSala
    };
}();