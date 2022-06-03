$(document).ready(function () {
    loja.configPefil();   
});

var loja = function(){

    var configPefil = function () {        
        $('#lblRank').text(usuario.acesso);
        $('#lblMoedas').text("💰 "+usuario.moeda);
        $('#lblBaus').text("📦 " + usuario.qtdeBaus);
        $('#lblSloteFichas').text(usuario.qtdeFichas);         
    };

    var adquirir = function(){
        var modal = new bootstrap.Modal($('#mdlaquirirPasseOuro'), {
            keyboard: false
        });
        modal.show('slow');
    };

    var comprar = function(){
        var modal = new bootstrap.Modal($('#mdlcomprarSloteFicha'), {
            keyboard: false
        });
        modal.show('slow');
    };
    return{
        adquirir: adquirir,
        comprar: comprar,
        configPefil: configPefil,
    };
}();