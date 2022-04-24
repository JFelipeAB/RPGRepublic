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
    };
};

var configListaItens = function () {
    let listaUsuariotratada = usuario.listaIten.map(item => { return item.descricao; });
    listaItemFiltrada = listaItenGeral.filter(item => !listaUsuariotratada.includes(item.descricao));
};

var recompensa = function () {
    var abrirCaixa = function () {
        debugger;
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
                    $("#divMoeda").show();
                    break;
                case 'icone':
                    $("#divIcone").show();
                    break;
                case 'FontFamily':
                    $("#divFontFamily").show();
                    break;
                case 'FontColor':
                    $("#divFontColor").show();
                    break;               
                default:
                    alert(`Erro, contate o administrador! tipo de item não cadastrado: ${itemSorteado.tipo}.`);
            }
            var modal = new bootstrap.Modal($('#mdlRecompensa'), {
                keyboard: false
            });
            modal.show('slow');
        }
        else
            alert("Voce não tem nenhuma caixa, MALANDRO(A)!");
    }
    return {
        abrirCaixa: abrirCaixa
    }
}();
