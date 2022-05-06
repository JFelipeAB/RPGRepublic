var usurName = usuario.login;
var usurImg = '<img class="IconMensage" src="' + usuario.icone + '" alt="user">';
var socket;

$(document).ready(function () {
    sala.configSocket();
    $('#imgIconFicha').attr("src", usuario.icone);
    sala.cronometro.inicio();
});

var sala = function () {
    
    var configSocket = function(){
        //socket = io.connect('https://rpgrepublic.jfelipeab.repl.co');
        socket = io.connect('http://localhost:3333');
        socket.on('resp', (retorno) => {
            $("#divChat").append(retorno);
            var objDiv = document.getElementById("divChat");
            objDiv.scrollTop = objDiv.scrollHeight;       
        });
        socket.emit("connection", '<div><i><strong>' + usurImg + ' '+ 
        usuario.login+'</strong> se conectou! </i> </div><hr>');
        
        // socket.on('disconnect', () => {
        //     socket.emit("connection", '<div><i><strong>' + usurImg + ' '+ 
        //     usuario.login+'</strong> se desconectou! </i> </div><hr>');
        // });
    };

    var idcomponenteFicha = 0;

    var dados = function () {
        $.ajax({
            url: "modalDados",
            contentType: 'application/json',
            dataType: 'HTML',
            method: 'POST',
            async: true
        }).done(function (partial_view) {
            if (partial_view)
                MontarModal(partial_view)
        }).fail(function () {
            alert("Falha na conexão com servidor");
        });
    };

    var MontarModal = function (partial_view) {

        $('#ModalBody').html(partial_view);
        var modal = new bootstrap.Modal(document.getElementById('ModalDados'), {
            keyboard: false
        })
        modal.show('slow');
    };

    var adicionarMensagem = function (text) {
        if (text)
            socket.emit("connection", '<div >' + usurImg + ' <strong>' + usurName + '</strong>: ' + text + '</div><hr>');        
        else 
            socket.emit("connection", '<div >' + usurImg + ' <strong>' + usurName + '</strong>: ' + GetMensagem() + '</div><hr>');
            
        };

    var GetMensagem = function () {
        let mensagem = $("#txtText").val();
        $("#txtText").val("");
        return mensagem;
    };

    var adicionarFicha = function (label, div) {        
        labelId = (label + idcomponenteFicha++).replaceAll(' ', '');;
        if (label) {
            let componente =
                "<div id='div" + labelId + "' class='col-xl-4 col-lg-6 col-md-6 col-sm-12 '>" +
                "<label for='txtAtributoFicha" + labelId + "' class='form-label'>" + label + "</label>" +
                "<div class='input-group mb-3'>" +
                "   <input type='text' id='txtAtributoFicha" + labelId + "' class='form-control' placeholder='" + label + "'" +
                "      aria-label='Recipient's username' aria-describedby='basic-addon2'>" +
                " <div class='input-group-append'>" +
                "    <button onclick='sala.excluirCampo(|" + labelId + "|)' class='btn btn-outline-secondary'" +
                "       type='button'>❌</button>" +
                "</div>" +
                "</div>" +
                "</div>";
            $(div).append(componente.replaceAll('|', '"'));
        }
    };

    var addItem = function () {
        adicionarFicha($("#txtItemFicha").val(), "#divItem");
        $("#txtItemFicha").val("");
    };

    var addAtributo = function () {
        adicionarFicha($("#txtAtributoFicha").val(), "#divAtributo");
        $("#txtAtributoFicha").val("");
    };

    var excluirCampo = function (label) {
        $('#div' + label).remove();
    };

    var salvarUsuarioCompleto = function () {
        $.ajax({
            url: "salvarUsuario",
            contentType: 'application/json',
            data: JSON.stringify(usuario),
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

    var coletarXP = function () {       
        usuario.xp++;
        if (usuario.xp == usuario.nivel) {
            usuario.nivel++;
            usuario.xp = 0;
            usuario.qtdeBaus++;
        }
        salvarUsuarioCompleto();
        cronometro.reinicio();
    };

    var cronometro = function () {
        var centesimas = 0;
        var segundos = 0;
        var minutos = 0;
        function inicio() {
            control = setInterval(cronometro, 10);
        }
        function reinicio() {
            clearInterval(control);
            centesimas = 0;
            segundos = 0;
            minutos = 0;
            relSegundos.innerHTML = ":00";
            relMinutos.innerHTML = ":00";
            $("#divXpUp").hide();
            $("#divCronometro").show();
            inicio();
        };
        function cronometro() {
            if (centesimas < 99) {
                centesimas++;
                if (centesimas < 10) { centesimas = "0" + centesimas }

            }
            if (centesimas == 99) {
                centesimas = -1;
            }
            if (centesimas == 0) {
                segundos++;
                if (segundos < 10) { segundos = "0" + segundos }
                relSegundos.innerHTML = ":" + segundos;
            }
            if (segundos == 59) {
                segundos = -1;
            }
            if ((centesimas == 0) && (segundos == 0)) {
                minutos++;
                if (minutos < 10) { minutos = "0" + minutos }
                relMinutos.innerHTML = minutos;
            }
            if (minutos == 2) {
                minutos = -1;
                clearInterval(control);
                $("#divXpUp").show();
                $("#divCronometro").hide();
            }
        }
        return {
            inicio: inicio,
            reinicio: reinicio
        }
    }();


    return {
        adicionarMensagem: adicionarMensagem,
        addAtributo: addAtributo,
        addItem: addItem,
        excluirCampo: excluirCampo,
        coletarXP: coletarXP,
        cronometro: cronometro,
        configSocket: configSocket
    };
}();