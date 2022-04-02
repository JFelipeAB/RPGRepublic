var usurName = 'Usuario123';
var usurIcon = '<img class="avatarUserIcon" src="https://avatars.dicebear.com/api/avataaars/uash.svg" alt="user">'
var sala = function () {

    var idUsuario;

    var controles = function () {
        return {
            DivChat: ".messages",
            txtTexto: "#txtText",
        };
    };

    var CriaSalas = function () {
        return Math.floor((Math.random() * 10) + 1); //cria salaAleatoria  

        $.ajax({
            data: idUsuario,
            url: "sala/PesquisarFicha",
            context: document.body
        }).done(function (data) {
            $(this).addClass("done");
            preecheFicha(data);
        }).fail(function () {
            alert("Erro do servidor");
        })
    };

    var preecheFicha = function (data) {

    }

    var dados = function () {
        $.ajax({
            url: "modalDados",
            contentType: 'aplication/json',
            dataType: 'HTML',
            method: 'POST',
            async: true
        }).done(function (partial_view) {
            if (partial_view)
                MontarModal(partial_view)
        }).fail(function () {
            alert("Falha na conexão com servidor");
        });

    }

    var MontarModal = function (partial_view) {

        $('#ModalBody').html(partial_view);

        var modal = new bootstrap.Modal(document.getElementById('ModalDados'), {
            keyboard: false
        })
        modal.show('slow');
    }

    var adicionarMensagem = function (text) {
        if (text)
            $("#divChat").append('<div >'+usurIcon +' <strong>' + usurName + '</strong>: ' + text + '</div><hr>')
        else
            $("#divChat").append('<div >'+usurIcon +' <strong>' + usurName + '</strong>: ' + GetMensagem() + '</div><hr>')
        var objDiv = document.getElementById("divChat");
        objDiv.scrollTop = objDiv.scrollHeight;

    };

    var GetMensagem = function () {
        return $("#txtText").val();
    };

    return {
        controles: controles,
        adicionarMensagem: adicionarMensagem,
        CriaSalas: CriaSalas,
        dados: dados
    };
}();