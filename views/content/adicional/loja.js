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

    return{
        configPefil: configPefil,
    };
}();