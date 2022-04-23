var listaItemFiltrada;

$(document).ready(function () {    
    configBaus();
    configListaItens();
});

var configBaus = function (){
    if (usuario.qtdeBaus > 0) {
        $('#imgBau').attr("src", "./content/images/BauOpen.gif");
        $('#btnAbrirBau').prop("disabled", false);
        $("#btnAbrirBau").html('ABRIR BAU(' + usuario.qtdeBaus + ')');
    };    
};

var configListaItens = function (){   
    let listaUsuariotratada = usuario.listaIten.map(item => { return item.descricao; });
    listaItemFiltrada = listaItenGeral.filter(item => !listaUsuariotratada.includes(item.descricao));  
};

var recompensa = function () {    
    var abrirCaixa = function () {
        debugger;
        if (usuario.qtdeBaus > 0) {
            let itemSelected = Math.floor(Math.random() * listaItemFiltrada.length)
            let itemSorteado = listaItemFiltrada[itemSelected];
            console.log(itemSorteado);

        }
        else
            alert("Voce não tem nenhuma caixa, MALANDRO(A)!");
    }
    return {
        abrirCaixa: abrirCaixa
    }
}();
