var usuario = JSON.parse(localStorage.getItem('usuario'));

$(document).ready(function () {
    if (usuario.qtdeBaus > 0) {
        $('#imgBau').attr("src", "./content/images/BauOpen.gif");
        $('#btnAbrirBau').prop("disabled", false);
        $("#btnAbrirBau").html('ABRIR BAU(' + usuario.qtdeBaus + ')');
    };
});

var recompensa = function () {
    
    var abrirCaixa = function () {
        if (usuario.qtdeBaus > 0) {
            var itemSelected = floor(Math.random() * listaItens.count())
            let itemSorteado = listaItens[itemSelected];
            console.log(itemSorteado);

        }
        else
            alert("Voce não tem nenhuma caixa, MALANDRO(A)!");
    }
    return {
        abrirCaixa: abrirCaixa
    }
}();
