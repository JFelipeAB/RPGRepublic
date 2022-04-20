var usuario = JSON.parse(localStorage.getItem('usuario'));
var usurName = usuario.login;
var usurImg = '<img class="IconMensage" src="' +usuario.icon +'" alt="user">';

$(document).ready(function () {         
    $('#imgIconFicha').attr("src",usuario.icon);
});

var sala = function () {

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
            $("#divChat").append('<div >' + usurImg + ' <strong>' + usurName + '</strong>: ' + text + '</div><hr>')
        else
            $("#divChat").append('<div >' + usurImg + ' <strong>' + usurName + '</strong>: ' + GetMensagem() + '</div><hr>')
        var objDiv = document.getElementById("divChat");
        objDiv.scrollTop = objDiv.scrollHeight;

    };

    var GetMensagem = function () {
        let mensagem = $("#txtText").val();
        $("#txtText").val("");
        return mensagem;
    };

    var adicionarFicha = function (label, div) {          
        debugger;      
        labelId = (label + idcomponenteFicha++).replaceAll(' ','');;
        if (label) {
            let componente = 
            "<div id='div"+labelId+"' class='col-xl-4 col-lg-6 col-md-6 col-sm-12 '>" +
            "<label for='txtAtributoFicha"+labelId+"' class='form-label'>"+label+"</label>" +
            "<div class='input-group mb-3'>" +
            "   <input type='text' id='txtAtributoFicha"+labelId+"' class='form-control' placeholder='"+label+"'" +
            "      aria-label='Recipient's username' aria-describedby='basic-addon2'>" +
            " <div class='input-group-append'>" +
            "    <button onclick='sala.excluirCampo(|"+labelId+"|)' class='btn btn-outline-secondary'" +
            "       type='button'>❌</button>" +
            "</div>" +
            "</div>" +
            "</div>";            
                $(div).append(componente.replaceAll('|','"'));
                
        }
    }
    var addItem = function () {
        adicionarFicha($("#txtItemFicha").val(), "#divItem");
        $("#txtItemFicha").val("");
    };
    var addAtributo = function () {
        adicionarFicha($("#txtAtributoFicha").val(), "#divAtributo");
        $("#txtAtributoFicha").val("");
    };
    var excluirCampo = function(label){        
        $('#div'+label).remove();
    }

    return {
        adicionarMensagem: adicionarMensagem,
        addAtributo: addAtributo,
        addItem: addItem,
        excluirCampo: excluirCampo,
    };
}();