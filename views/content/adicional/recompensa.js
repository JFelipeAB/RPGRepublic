var listaItemFiltrada;

$(document).ready(function () {
    configBaus();
    configListaItens();
});

var configBaus = function () {
    if (usuario.qtdeBaus > 0) {
        $('#imgBau').attr("src", "./content/images/BauOpen.gif");
        $('#btnAbrirBau').prop("disabled", false);
        $("#btnAbrirBau").html('ABRIR BAU(' + usuario.qtdeBaus + ')');
    }
    else {
        $('#imgBau').attr("src", "./content/images/vazio.webp");
        $('#btnAbrirBau').prop("disabled", true);
        $("#btnAbrirBau").html('😭 NENHUMA CAIXA PARA ABRIR 🥱');
    };
};

var configListaItens = function () {
    let listaUsuariotratada = usuario.listaIten.map(item => { return item.descricao; });
    listaItemFiltrada = listaItenGeral.filter(item => !listaUsuariotratada.includes(item.descricao));
};

var recompensa = function () {
    var abrirCaixa = function () {
        if (usuario.qtdeBaus > 0) {
            $("#divMoeda").hide();
            $("#divIcone").hide();
            $("#divFontFamily").hide();
            $("#divFontColor").hide();
            let posicaoSelecionada = Math.floor(Math.random() * listaItemFiltrada.length)
            let itemSorteado = listaItemFiltrada[posicaoSelecionada];
            console.log(listaItemFiltrada);
            switch (itemSorteado.tipo) {
                case 'moeda':
                    debugger;
                    $("#divMoeda").show();
                    break;
                case 'icone':
                    $('#imgIconeNovo').attr("src", itemSorteado.descricao);
                    $("#divIcone").show();
                    break;
                case 'FontColor':
                    $("#iptCorNova").val(itemSorteado.cor);
                    $("#divTextoCorNova").append(itemSorteado.descricao)
                    $("#divFontColor").show();
                    break;
                case 'FontFamily':
                    $("#divTextoFonteNova").append(itemSorteado.descricao)
                    $('#divTextoFonteNova').css("font-family", itemSorteado.descricao);
                    $("#divFontFamily").show();
                    break;
                default:
                    alert(`Erro, contate o administrador! tipo de item não cadastrado: ${itemSorteado.tipo}.`);
            }
            var modal = new bootstrap.Modal($('#mdlRecompensa'), {
                keyboard: false
            });
            modal.show('slow');
            if (itemSorteado.tipo == 'moeda')
                usuario.moeda++;
            else
                usuario.listaIten.push(itemSorteado);
            usuario.qtdeBaus--;
            salvarUsuarioCompleto();
            configBaus();
            configListaItens();
        }
        else
            alert("Voce não tem nenhuma caixa, MALANDRO(A)!");
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

    return {
        abrirCaixa: abrirCaixa
    }
}();
