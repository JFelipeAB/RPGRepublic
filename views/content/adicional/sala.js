var usurName = usuario.login;
var usurImg = '<img class="IconMensage" src="' + usuario.icone + '" alt="user">';
var socket;

$(document).ready(function () {
    sala.configSocket();
    sala.configGeral();
    sala.cronometro.inicio();
});

var sala = function () {

    var idcomponenteFicha = 0;

    var configGeral = function () {
        $('#chat').on('submit', function (e) {
            e.preventDefault();
            sala.adicionarMensagem()
        });
        $('#imgIconFicha').attr("src", usuario.icone);
        $('.textoEditavel').css("color", usuario.textoCorN);
        $('.textoEditavel').css("font-family", usuario.textoFonte);
    }

    var configSocket = function () {
        //socket = io.connect('https://rpgrepublic.jfelipeab.repl.co');
        socket = io.connect('http://localhost:3333');
        socket.on('resp', (retorno) => {
            $("#divChat").append(retorno);
            var objDiv = document.getElementById("divChat");
            objDiv.scrollTop = objDiv.scrollHeight;
        });
        socket.emit("connection", '<div><i><strong>' + usurImg + ' ' +
            usuario.login + '</strong> se conectou! </i> </div><hr>');

        socket.on('disconnect', () => {
            console.log(usuario.login + 'desconectiou');
            // socket.emit("connection", '<div><i><strong>' + usurImg + ' '+ 
            // usuario.login+'</strong> se desconectou! </i> </div><hr>');
        });
    };

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
            socket.emit("connection", `<div style="font-family:${usuario.textoFonte}; color:${usuario.textoCorN}"` +
                `class="textoEditavel">${usurImg}<strong>${usurName}</strong>: ${text}</div><hr>`);
        else {
            if (GetMensagem())
                socket.emit("connection", `<div style="font-family:${usuario.textoFonte}; color:${usuario.textoCorN}"` +
                    `class="textoEditavel">${usurImg}<strong>${usurName}</strong>: ${GetMensagem()}</div><hr>`);
            $("#txtText").val("");
        };
    };

    var GetMensagem = function () {
        return $("#txtText").val();
    };

    var adicionarFicha = function (label, div) {
        labelId = (label + idcomponenteFicha++).replaceAll(' ', '');;
        if (label) {
            let componente =
                "<div id='div" + labelId + "' class='col-xl-6 col-lg-6 col-md-6 col-sm-6 '>" +
                "<label for='txtAtributoFicha" + labelId + "' class='form-label'>" + label + "</label>" +
                "<div class='input-group mb-3'>" +
                "   <input style='font-family:" + usuario.textoFonte + "; color:" + usuario.textoCorN + "' type='number' id='txtAtributoFicha textoEditavel" + labelId + "' class='form-control' placeholder='" + label + "'" +
                "      aria-label='Recipient's username' aria-describedby='basic-addon2'>" +
                " <div class='input-group-append'>" +
                "    <button onclick='sala.excluirCampo(|" + labelId + "|)' class='btn btn-outline-secondary'" +
                "       type='button' class='btn btn-sm'>❌</button>" +
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
                usuario = retorno.usuario;
            }
        }).fail(function () {
            alert("Falha na conexão com servidor, suas ações não foram salvas!!");
        });
    };

    var coletarXP = function () {        
        usuario.xP++;
        if (usuario.xP == usuario.nivel) {          
            usuario.nivel++;
            usuario.xP = 0;
            usuario.qtdeBaus++;
            $('#aUsuario').html(usuario.login + ' Nvl ' + usuario.nivel);
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
            relMinutos.innerHTML = "00";
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

    var salvarFicha = function() {
    
    };

    var carregarFicha = function(){

    };

    return {
        adicionarMensagem: adicionarMensagem,
        addAtributo: addAtributo,
        addItem: addItem,
        excluirCampo: excluirCampo,
        coletarXP: coletarXP,
        cronometro: cronometro,
        configSocket: configSocket,
        configGeral: configGeral,
        salvarFicha: salvarFicha,
        carregarFicha: carregarFicha,
    };
}();